import {z} from "zod";
import {jargonRequest} from "../../framework/route";

export default jargonRequest({
    responseSchema: z.object({
        id: z.number(),
        name: z.string(),
        age: z.number()
    }).array(),
    querySchema: z.object({
        filter: z.string().optional(),
        limit: z.number().max(100).optional(),
        offset: z.number().optional()
    }),
    handler: async ({params, query}) => {
        // logic
        // const users = getUsers(params.filter, query.limit, query.offset);
        return [
            {
                id: 1,
                name: 'John',
                age: 20
            }
        ]
    }
});
