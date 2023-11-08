import { Router } from "express";

const auth_routes = Router();

auth_routes.get('/', async (req, res) => {
	try {
		res.render('index');
	} catch (error) {
		// 
	}
});

export default auth_routes;