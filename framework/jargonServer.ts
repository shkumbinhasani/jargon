/**
 * The jargonServer function handles incoming HTTP requests.
 *
 * @module jargonServer
 * @param {RoutesInterface} routes This parameter provides the structure and necessary route details.
 * @param {number} port This is the port through which the server will communicate.
 * @param {() => void} callback This is a callback function executed once the server starts listening.
 *
 * The function creates an HTTP server and sets it up to listen on a provided port.
 * All incoming requests are passed to a requestHandler function, which is expected to return a response object.
 * The server then uses this response object to set the necessary headers and end the response with the correct body.
 * If an error occurs during request handling, the server catches it and ends the response with the correct error status and message.
 * If the error is a specific HttpError instance, it is handled gracefully with additional data returned in the response.
 * Otherwise, a 500 error status is returned, and the error is logged to the console.
 */
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
