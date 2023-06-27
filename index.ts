import getRoutes from "./framework/routes";
import * as path from "path";
import jargonServer from "./framework/jargonServer";

const routesPath = path.join(__dirname, 'routes');
const routes = getRoutes(routesPath);

jargonServer(routes, 3000, () => {
    console.log(`Server listening on port 3000`);
});
