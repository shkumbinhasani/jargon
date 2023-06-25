import * as http from 'http';
import getRoutes from "./routes";
import * as console from "console";

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

    const path = url?.split('/').filter(Boolean) || [];
    path.push(req.method?.toUpperCase() || 'GET');
    const routes = getRoutes();
    const fn = getFunction(path, routes);
    try {
        console.log(fn?.params);
        const response = await fn?.handler?.(query, req.headers);
        const responseJson = JSON.stringify(response, null, 2);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(responseJson);
    } catch (e) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: e}, null, 2));
    }
});

server.listen(3000, () => {
    console.log(`  __                                             _    
 / _|                                           | |   
| |_ _ __ __ _ _ __ ___   _____      _____  _ __| | __
|  _| '__/ _\` | '_ \` _ \\ / _ \\ \\ /\\ / / _ \\| '__| |/ /
| | | | | (_| | | | | | |  __/\\ V  V / (_) | |  |   < 
|_| |_|  \\__,_|_| |_| |_|\\___| \\_/\\_/ \\___/|_|  |_|\\_\\`);
});
