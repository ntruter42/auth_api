import { Router } from "express";
import { service, auth } from "../index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const auth_api = Router();

class CustomError {
	status = 'Error';
	constructor(name, error, message) {
		this.name = name;
		this.error = error;
		this.message = message;
	}
}

auth_api.post('/user', async (req, res) => {
	try {
		if (!req.body.username) {
			throw new CustomError(
				"InputError",
				"Empty username",
				"Enter a username"
			);
		}

		const user = await service.getUser(req.body.username);
		if (!user || !user.user_id) {
			throw new CustomError(
				"AuthenticationError",
				"Username not found",
				"The username or password entered is incorrect"
			);
		}

		// if (!(await auth.comparePasswords(req.body.password, user.password))) {
		// 	throw new CustomError(
		// 		"AuthenticationError",
		// 		"Incorrect password",
		// 		"The username or password entered is incorrect"
		// 	);
		// }

		const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: 60 * 60 });
		res.json({
			status: "Success",
			token
		});
	} catch (error) {
		res.status(400).json(error);
	}
});

auth_api.post('/verify', async (req, res) => {
	try {
		const token = req.header('authorization').startsWith('Bearer')
			? req.header('authorization').split(' ')[1]
			: undefined;
		if (!token) {
			throw new CustomError(
				"TokenError",
				"Invalid Token",
				"The token provided is missing or invalid"
			);
		}

		const auth = jwt.verify(token, process.env.SECRET_KEY);
		res.json({
			status: "Success",
			auth: auth ? true : false
		})
	} catch (error) {
		res.status(400).json(error);
	}
});

auth_api.post('/logout', async (req, res) => {
	try {
		// 
	} catch (error) {
		// 
	}
});

auth_api.post('/register', async (req, res) => {
	try {
		// if (!req.body.password || !req.body.confirm) {
		// 	throw new CustomError(
		// 		"InputError",
		// 		"Empty password",
		// 		"Enter a password and confirmation password"
		// 	);
		// }

		// if (await auth.comparePasswords(req.body.password, req.body.confirm)) {

		// 	throw new CustomError(
		// 		"InputError",
		// 		"Invalid password confirmation",
		// 		"Passwords do not match"
		// 	);
		// }

		const user = await service.createUser(req.body);
		if (!user) {
			throw new CustomError(
				"DuplicateError",
				"Duplicate username",
				"The username entered is already in use"
			);
		}

		res.json({
			status: "Success",
			user: { ...user, password: undefined }
		})
	} catch (error) {
		res.status(400).json(error);
	}
});


auth_api.post('/remove', async (req, res) => {
	try {
		if (!req.body.username) {
			throw new CustomError(
				"InputError",
				"Empty username",
				"Please provide a username"
			);
		}

		const user = await service.removeUser(req.body.username, req.body.password);
		if (!user || !user.user_id) {
			throw new CustomError(
				"DeletionError",
				"Incorrect username or password",
				"The username or password entered is incorrect"
			);
		}

		res.json({
			status: "Success",
			deleted_user: { ...user, password: undefined }
		})
	} catch (error) {
		res.status(400).json(error);
	}
});

auth_api.post('/forgot', async (req, res) => {
	try {
		// 
	} catch (error) {
		// 
	}
});

auth_api.get('/users', async (req, res) => {
	try {
		const users = await service.getUsers();

		res.json({
			status: "Success",
			users
		})
	} catch (error) {
		res.status(400).json(error);
	}
});

export default auth_api;