/**
 * This TypeScript module contains utility functions for parsing and validating HTTP request data
 * using Zod schemas, then delegating the handling of each request to provided "handler" functions.
 */

import {z, ZodSchema} from 'zod';
import {BadGatewayError, BadRequestError} from '../http-errors';

/**
 * Function to parse and validate data using a Zod schema. If passed schema is
 * not defined, the function returns the data as-is, without validation.
 *
 * @param {unknown} data Unknown data to be validated.
 * @param {ZodSchema} schema The Zod schema to be used for validation.
 * @param {'params' | 'query' | 'response' | 'body'} dataType The type of the data being validated.
 * @returns {unknown} Returns validated data.
 * @throws {BadRequestError | BadGatewayError} If data validation fails.
 */
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

/**
 * Type guard to check if a type is `any` or `unknown`.
 *
 * @template T The type to check.
 * @returns {unknown} The `any` or `unknown` type.
 */
type IfAnyUnknown<T> = 0 extends (1 & T) ? unknown : T;

/**
 * A helper function for making requests, providing a structured way to validate their parameters,
 * query, body, and response with Zod schemas, perform optional authentication, and handle the request.
 *
 * @template P Parameter's schema type.
 * @template Q Query's schema type.
 * @template B Body's schema type.
 * @template R Response's schema type.
 * @template U User type.
 * @param {Object} args Configuration options for the request.
 * @returns {Function} Returns an async function that accepts the params, query, body, and headers,
 *  then validates and processes the request accordingly.
 */
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
        // Parse and validate the params, query, and body with the corresponding schemas.
        const parsedParams = parseData(params, args.paramsSchema, 'params');
        const parsedQuery = parseData(query, args.querySchema, 'query');
        const parsedBody = parseData(body, args.bodySchema, 'body');

        // If an authentication function is provided, use it to authenticate the user.
        const user = args.authentication ? await args.authentication({
            params: parsedParams,
            headers: headers,
            query: parsedQuery
        }) : undefined;

        // Pass the validated and parsed data to the handler function.
        const response = await args.handler({
            params: parsedParams,
            headers: headers,
            body: parsedBody,
            query: parsedQuery,
            user
        });

        // Validate the response with the response schema.
        return parseData(response, args.responseSchema, 'response');
    };
}
