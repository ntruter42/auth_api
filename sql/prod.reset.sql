
DROP TABLE IF EXISTS auth_api.users CASCADE;

CREATE TABLE auth_api.users (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL UNIQUE,
	full_name VARCHAR(255) NOT NULL,
	password VARCHAR(60) NOT NULL
);

ALTER SEQUENCE auth_api.users_user_id_seq RESTART WITH 1000;

INSERT INTO auth_api.users
	(username, full_name, password)
VALUES
	('ntruter42', 'Nicholas Truter', 'codex123')
	-- ('ntruter42', 'Nicholas Truter', '$2b$10$cxK.emL.AHc7XzMf5fVaTe5gFjNblOowr71YC.qFN4UJvZ902VKzG'),
	-- ('emusk69', 'Elon Musk', '$2b$10$aTEFSH3iQnefKPT9L3cOFuiEYyzcaKqh9JsiQElcjB2d.Uyrdhu96')
;