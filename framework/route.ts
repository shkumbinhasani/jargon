import {z, ZodSchema} from "zod"

export function getRequest<P extends ZodSchema, Q extends ZodSchema, R extends ZodSchema, U>(args: {
    paramsSchema?: P,
    querySchema?: Q,
    responseSchema?: R,
    authentication?: (args: {
        params: z.infer<P>,
        query: z.infer<Q>,
        headers: Record<string, string>,
    }) => Promise<U> | U
    handler(args: {
        params: z.infer<P>,
        query: z.infer<Q>,
        headers: Record<string, string>,
        user: U | undefined,
    }): z.infer<R> | Promise<z.infer<R>>
}) {
    return async (params: unknown, query: unknown, headers: Record<string, string>) => {
        const parsedParams = args.paramsSchema?.parse(params) ?? params;
        const parsedQuery = args.querySchema?.parse(headers) ?? headers;
        const user = args.authentication ? await args.authentication({
            params: parsedParams,
            headers: headers,
            query: parsedQuery,
        }) : undefined;

        const response = await args.handler({
            params: parsedParams,
            headers: headers,
            query: parsedQuery,
            user
        });

        return args.responseSchema?.parse(response) ?? response;
    }
}
