import app_setup from "./config/app.js";
import db_config from "./config/database.js";
import database_services from "./services/database_services.js";
import auth_services from "./services/auth_services.js";
import auth_routes from "./routes/auth_routes.js";
import auth_api from "./routes/auth_api.js";

const app = app_setup();
const db = db_config();
const auth = auth_services();
const data = database_services(db);

app.use('/', auth_routes);
app.use('/api/auth', auth_api);

export { data, auth };

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});