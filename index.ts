import * as http from 'http';
import getRoutes from "./routes";
import * as console from "console";
import {HttpError, NotFoundError} from "./http-errors";

function getFunction(path: string[], route: Record<string, any>, params: Record<string, string> = {}) {
    if (path.length > 0) {
        const [first, ...rest] = path;
        if (first in route) {
            if (typeof route[first] === "function") {
                return {
                    handler: route[first],
                    params
                };
            }
            return getFunction(rest, route[path[0]], params);
        } else if (Object.keys(route).some(key => key.startsWith(':'))) {
            const [paramKey, ...paramRest] = Object.keys(route).filter(key => key.startsWith(':'));
            return getFunction(rest, route[paramKey], {
                ...params,
                [paramKey.replace(':', '')]: first
            });
        }
    }
}

const server = http.createServer(async (req, res) => {
    const [url, ...queryParams] = req.url?.split('?') || [];
    const query = queryParams.join("?").split('&').reduce((acc, curr) => {
        const [key, value] = curr.split('=');
        acc[key] = value;
        return acc;
    }, {} as Record<string, string>);

    const body = await new Promise<string>((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            resolve(body);
        });
        req.on('error', (err) => {
            reject(err);
        })
    });

    const bodyJson = body ? JSON.parse(body) : undefined;

    const path = url?.split('/').filter(Boolean) || [];
    path.push(req.method?.toUpperCase() || 'GET');
    const routes = getRoutes();
    const fn = getFunction(path, routes);
    try {
        if(fn?.handler) {
            const response = await fn?.handler?.(query, fn.params, req.headers);
            const responseJson = JSON.stringify(response, null, 2);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(responseJson);
        } else {
            throw new NotFoundError('not-found')
        }
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
        res.end(JSON.stringify({}, null, 2));
    }
});

server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000/`);
});
