import {IncomingMessage} from "http";
import {RoutesInterface} from "./routes";
import {NotFoundError} from "./HttpErrors";
import {HandlerFunction} from "./jargonEndpoint";
import {ZodSchema} from "zod";
import {JargonResponse} from "./JargonResponse";

/**
 * Parses the request and invokes the appropriate route handler.
 * @param routes The routes object.
 * @param req The incoming HTTP request.
 * @returns The response object containing the status and response body.
 */
export async function handleHttpRequest(routes: RoutesInterface, req: IncomingMessage) {
    const { path, queryParams, body, headers } = await parseRequest(req);
    const fn = getFunction(path, routes);

    if (fn?.handler) {
        const response = await fn.handler(fn.params, queryParams, body, headers);
        if (response instanceof JargonResponse) {
            return response;
        }
        return {
            status: response ? 200 : 204,
            body: response,
        };
    } else {
        throw new NotFoundError("not-found");
    }
}

/**
 * Helper function for parsing request to extract its parts
 * @param req Incoming HTTP request
 * @returns Parsed request parts (path, queryParams, body, headers)
 */
async function parseRequest(req: IncomingMessage) {
    // URL and query params
    const [url, ...queryParams] = req.url?.split("?") || [];

    const query = queryParser(queryParams.join("?"));

    // Request body
    const body = await bodyParser(req);

    // Request path
    const path = url?.split("/").filter(Boolean) || [];
    path.push(req.method?.toUpperCase() || 'GET');

    return {
        path,
        queryParams: query,
        body: body,
        headers: req.headers as Record<string, string>
    };
}

/**
 * Helper function for parsing query parameters
 * @param queryParams String query parameters
 * @returns Parsed query parameters
 */
function queryParser(queryParams: string) {
    return queryParams
        .split("&")
        .reduce((acc, curr) => {
            const [key, value] = curr.split("=");
            acc[key] = value;
            return acc;
        }, {} as Record<string, string>);
}

/**
 * Helper function for parsing request body
 * @param req Incoming HTTP request
 * @returns Promise that resolves with parsed request body
 */
function bodyParser(req: IncomingMessage): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        let body = "";
        req.on("data", (chunk: any) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                const parsedBody = JSON.parse(body);
                resolve(parsedBody);
            } catch {
                resolve(body);
            }
        });
        req.on("error", (err: any) => {
            reject(err);
        });
    });
}

/**
 * Recursively traverses a given route tree to find a handler function
 * corresponding to a specific path. Also collects and returns any
 * path parameters along the way.
 *
 * @param path - An array of path segments, representing the requested path
 * @param route - A route object containing nested routes and handler functions
 * @param params - An optional object containing the path parameters collected so far
 * @returns An object with the handler function and the collected params, or undefined if not found
 */
function getFunction(
    path: string[],
    route: Record<string, any>,
    params: Record<string, string> = {}
): {
    handler: HandlerFunction<ZodSchema>,
    params: Record<string, string>
} | void {
    if (path.length > 0) {
        const [first, ...rest] = path;

        if (first in route) {
            if (typeof route[first] === "function") {
                return {
                    handler: route[first] as HandlerFunction<ZodSchema>,
                    params,
                };
            }
            return getFunction(rest, route[path[0]], params);
        } else if (Object.keys(route).some((key) => key.startsWith("{") && key.endsWith("}"))) {
            const [paramKey] = Object.keys(route).filter(
                (key) => key.startsWith("{") && key.endsWith("}")
            );
            const pureParamKey = paramKey.replace("{", "").replace("}", "");

            return getFunction(rest, route[paramKey], {
                ...params,
                [pureParamKey]: first,
            });
        }
    }
}
