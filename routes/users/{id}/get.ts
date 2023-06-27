import {z} from "zod";
import {jargonRequest} from "../../../framework/jargonRequest";

export default jargonRequest({
    paramsSchema: z.object({
        id: z.string()
    }),
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
                params,
                query,
            }
        ]
    }
});
