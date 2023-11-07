import { Router } from "express";
import { data, auth } from "../index.js";

const auth_api = Router();

auth_api.post('/login', async (req, res) => {
	try {
		const user = await data.getUserID(req.body.username, req.body.email);
		const auth = await data.validatePassword(user.user_id, req.body.password) ? true : false;

		res.json({
			status: "Success",
			user_id: user.user_id,
			auth
		})
	} catch (error) {
		res.json({
			status: "Error",
			error: error.message
		})
	}
});

auth_api.post('/logout', async (req, res) => {
	try {
		// 
	} catch (error) {
		// 
	}
});

auth_api.get('/register', async (req, res) => {
	try {
		// 
	} catch (error) {
		// 
	}
});

auth_api.get('/forgot', async (req, res) => {
	try {
		// 
	} catch (error) {
		// 
	}
});

auth_api.get('/reset', async (req, res) => {
	try {
		// 
	} catch (error) {
		// 
	}
});

export default auth_api;