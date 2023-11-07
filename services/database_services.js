export default (db) => {
	const s = 'auth_api';
	const t = {
		users: `${s}.users`
	};

	const getUserID = async (username, email) => {
		let query = `SELECT user_id FROM ${t.users} WHERE `;

		if (username) {
			query += `username = '${username}'`;
		} else if (email) {
			query += `email = '${email}'`;
		} else {
			return null;
		}

		return await db.oneOrNone(query);
	}

	const validatePassword = async (user_id, password) => {
		let query = `
			SELECT * FROM ${t.users}
			WHERE user_id = '${user_id}'
			AND password = '${password}'
		`;

		return db.oneOrNone(query);
	}

	return {
		getUserID,
		validatePassword
	}
}