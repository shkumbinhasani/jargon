import getRoutes from "./framework/routes";
import * as path from "path";
import jargonServer from "./framework/jargonServer";
import {env} from "./env";

const routesPath = path.join(__dirname, 'routes');
const routes = getRoutes(routesPath);

jargonServer(routes, env.PORT, () => {
    console.log(`${env.APP_NAME} Server listening on port 3000`);
});
