export default (db) => {
	const s = 'auth_api';
	const t = {
		users: `${s}.users`
	};

	const getUserID = async (username) => {
		let query = `
			SELECT user_id FROM ${t.users}
			WHERE username = '${username}'
		`;

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

	const createUser = async (new_user) => {
		let query = `
			INSERT INTO ${t.users} (username, full_name, password)
			VALUES (
				'${new_user.username}',
				'${new_user.full_name}',
				'${new_user.password}'
			)
			ON CONFLICT DO NOTHING
			RETURNING user_id
		`;

		return await db.oneOrNone(query);
	}

	const removeUser = async (username, password) => {
		let query = `
			DELETE FROM ${t.users}
			WHERE username = '${username}',
			AND password = '${password}'
		`;

		return await db.oneOrNone(query);
	}

	const getUsers = async (username) => {
		let query = `
			SELECT * FROM ${t.users}
		`;

		return await db.manyOrNone(query);
	}

	return {
		getUsers,
		getUserID,
		validatePassword,
		createUser,
		removeUser
	}
}