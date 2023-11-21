export default (db) => {
	const s = 'auth_api';
	const t = {
		users: `${s}.users`
	};

	const getUsers = async () => {
		let query = `SELECT user_id, username, full_name FROM ${t.users}`;

		return await db.manyOrNone(query);
	}

	const getUser = async (username) => {
		let query = `
			SELECT * FROM ${t.users}
			WHERE username = $1
		`;

		return await db.oneOrNone(query, [username]);
	}

	const createUser = async (new_user) => {
		let query = `
			INSERT INTO ${t.users} (username, full_name, password)
			VALUES ($1, $2, $3)
			ON CONFLICT DO NOTHING
			RETURNING *
		`;

		return await db.oneOrNone(query, [new_user.username, new_user.full_name, new_user.password]);
	}

	const removeUser = async (username, password) => {
		let query = `
			DELETE FROM ${t.users}
			WHERE username = $1
			AND password = $2
			RETURNING *
		`;

		return await db.oneOrNone(query, [username, password]);
	}

	return {
		getUsers,
		getUser,
		createUser,
		removeUser
	}
}