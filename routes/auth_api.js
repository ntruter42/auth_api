import { Router } from "express";
import { data, auth } from "../index.js";

const auth_api = Router();

auth_api.post('/login', async (req, res) => {
	try {
		// TODO: Use jsonwebtoken for authentication

		const user = await data.getUserID(req.body.username);
		// req.flash("log", user);

		let auth;
		if (!req.body.username) {
			throw Error("Enter a username");
		} else if (!user || !user.user_id) {
			// req.flash("log", req.body.username);
			throw Error("Incorrect username or password");
		} else {
			auth = await data.validatePassword(user.user_id, req.body.password) ? true : false;
			// req.flash("log", auth);
		}

		if (!auth) {
			throw Error("Incorrect username or password");
		}

		res.json({
			status: "Success",
			user_id: user.user_id,
			// log: req.flash("log")[0]
		})
	} catch (error) {
		res.json({
			status: "Error",
			error: error.message,
			// log: req.flash("log")[0]
		})
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
		let user;
		if (req.body.password !== req.body.confirm) {
			// req.flash("log", `pw: ${req.body.password}, cpw: ${req.body.confirm}`);
			throw Error("Passwords do not match");
		} else {
			user = await data.createUser(req.body.username, req.body.full_name, req.body.password);
			// req.flash("log", user);
		}

		if (!user) {
			throw Error("Username already in use");
		}

		res.json({
			status: "Success",
			user_id: user.user_id,
			// log: req.flash("log")[0]
		})
	} catch (error) {
		res.json({
			status: "Error",
			error: error.message,
			// log: req.flash("log")[0]
		})
	}
});


auth_api.post('/remove', async (req, res) => {
	try {
		if (!req.body.username) {
			throw Error("Please provide a username");
		} else {
			await data.removeUser(req.body.username);
		}
	} catch (error) {
		res.json({
			status: "Error",
			error: error.message,
			// log: req.flash("log")[0]
		})
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
		const users = await data.getUsers();

		res.json({
			status: "Success",
			users,
			// log: req.flash("log")[0]
		})
	} catch (error) {
		res.json({
			status: "Error",
			error: error.message,
			// log: req.flash("log")[0]
		})
	}
});

export default auth_api;