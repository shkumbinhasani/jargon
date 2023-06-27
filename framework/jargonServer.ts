import {RoutesInterface} from "./routes";
import {handleHttpRequest} from "./requestHandler";
import {HttpError} from "../http-errors";
import * as http from 'http';

const jargonServer = (routes: RoutesInterface, port: number, callback: () => void) => {
    const server = http.createServer(async (req, res) => {

        try {
            const response = await handleHttpRequest(routes, req);
            res.writeHead(response.status, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(response.body, null, 2));
        } catch (e) {
            if (e instanceof HttpError) {
                res.writeHead(e.status, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    status: e.status,
                    message: e.message,
                    data: e.data
                }, null, 2));
                return;
            }
            res.writeHead(500, {'Content-Type': 'application/json'});
            console.log("Error", e);
            res.end();
        }
    });

    server.listen(port, callback);
}

export default jargonServer;
