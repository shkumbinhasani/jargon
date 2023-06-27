import {z, ZodSchema} from 'zod';
import {BadGatewayError, BadRequestError} from '../http-errors';

function parseData<T extends ZodSchema>(data: unknown, schema?: T, dataType?: 'params' | 'query' | 'response' | 'body') {
    if (schema) {
        const validation = schema.safeParse(data);
        if (!validation.success) {
            const errorType = dataType === 'response' ? BadGatewayError : BadRequestError;
            const errorMessage = dataType === 'response' ? 'invalid-response' : `invalid-${dataType}`;
            throw new errorType(errorMessage, validation.error.issues);
        }
        return validation.data;
    }
    return data;
}

type IfAnyUnknown<T> = 0 extends (1 & T) ? unknown : T;

export function jargonRequest<P extends ZodSchema, Q extends ZodSchema, B extends ZodSchema, R extends ZodSchema, U>(args: {
    paramsSchema?: P;
    querySchema?: Q;
    bodySchema?: B;
    responseSchema?: R;
    authentication?: (args: {
        params: z.infer<P>;
        query: z.infer<Q>;
        headers: Record<string, string>
    }) => Promise<U> | U;
    handler(args: {
        params: IfAnyUnknown<z.infer<P>>;
        query: IfAnyUnknown<z.infer<Q>>;
        body: IfAnyUnknown<z.infer<B>>;
        headers: Record<string, string>;
        user: U | undefined;
    }): z.infer<R> | Promise<z.infer<R>>;
}) {
    return async (params: unknown, query: unknown, body: unknown, headers: Record<string, string>) => {
        const parsedParams = parseData(params, args.paramsSchema, 'params');
        const parsedQuery = parseData(query, args.querySchema, 'query');
        const parsedBody = parseData(body, args.bodySchema, 'body');

        const user = args.authentication ? await args.authentication({
            params: parsedParams,
            headers: headers,
            query: parsedQuery
        }) : undefined;

        const response = await args.handler({
            params: parsedParams,
            headers: headers,
            body: parsedBody,
            query: parsedQuery,
            user
        });

        return parseData(response, args.responseSchema, 'response');
    };
}
