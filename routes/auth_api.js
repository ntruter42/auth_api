import { Router } from "express";
import { service, auth } from "../index.js";

const auth_api = Router();

auth_api.post('/login', async (req, res) => {
	try {
		// TODO: Use jsonwebtoken for authentication

		if (!req.body.username) {
			throw {
				name: "InputError",
				status: "Error",
				message: "Enter a username.",
				error: "Empty username"
			};
		}

		const user = await service.getUser(req.body.username);
		if (!user || !user.user_id) {
			throw {
				name: "AuthenticationError",
				status: "Error",
				message: "The username or password entered is incorrect.",
				error: "Username not found"
			};
		}

		if (user.password !== req.body.password) {
			throw {
				name: "AuthenticationError",
				status: "Error",
				message: "The username or password entered is incorrect.",
				error: "Incorrect password"
			};
		}

		res.json({
			status: "Success",
			user: { ...user, password: undefined }
		})
	} catch (error) {
		res.json(error)
	}
});

auth_api.post('/logout', async (req, res) => {
	try {
		// TODO: keep user logged in until expiry date and time
	} catch (error) {
		// 
	}
});

auth_api.post('/register', async (req, res) => {
	try {
		if (!req.body.password || !req.body.confirm) {
			throw {
				name: "InputError",
				status: "Error",
				message: "Enter a password and confirmation password.",
				error: "Empty password"
			};
		}

		if (req.body.password !== req.body.confirm) {
			throw {
				name: "InputError",
				status: "Error",
				message: "Passwords do not match.",
				error: "Invalid password confirmation"
			};
		}

		const user = await service.createUser(req.body);
		if (!user) {
			throw {
				name: "DuplicateError",
				status: "Error",
				message: "The username entered is already in use.",
				error: "Duplicate username"
			};
		}

		res.json({
			status: "Success",
			user: { ...user, password: undefined }
		})
	} catch (error) {
		res.json(error)
	}
});


auth_api.post('/remove', async (req, res) => {
	try {
		if (!req.body.username) {
			throw {
				name: "InputError",
				status: "Error",
				message: "Please provide a username.",
				error: "Empty username"
			};
		}

		const user = await service.removeUser(req.body.username, req.body.password);
		if (!user || !user.user_id) {
			throw {
				name: "DeletionError",
				status: "Error",
				message: "The username or password entered is incorrect.",
				error: "Incorrect username or password"
			};
		}

		res.json({
			status: "Success",
			deleted_user: { ...user, password: undefined }
		})
	} catch (error) {
		res.json(error)
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
		res.json(error)
	}
});

export default auth_api;