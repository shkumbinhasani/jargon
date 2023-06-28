import {z} from "zod";
import {jargonEndpoint} from "../../../framework/jargonEndpoint";

export default jargonEndpoint({
    paramsSchema: z.object({
        id: z.string()
    }),
    querySchema: z.object({
        filter: z.string().optional(),
        limit: z.number().max(100).default(20),
        offset: z.number().optional()
    }),
    handler: async ({params, query}) => {
        // logic
        // const users = getUsers(params.filter, query.limit, query.offset);
        return [
            {
                params,
                query,
            }
        ]
    }
});
