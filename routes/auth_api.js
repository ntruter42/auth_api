import { Router } from "express";
import { data, auth } from "../index.js";

const auth_api = Router();

auth_api.post('/login', async (req, res) => {
	try {
		// 
	} catch (error) {
		// 
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