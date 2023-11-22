import bcrypt from "bcrypt";

export default function auth () {
	const validateEmail = async (email) => {
		return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
	}

	const comparePasswords = async function (password, password_hash) {
		return await bcrypt.compare(password, password_hash);
	};

	return {
		validateEmail,
		comparePasswords
	}
}