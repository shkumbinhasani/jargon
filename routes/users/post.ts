import {z} from "zod";
import {jargonRequest} from "../../framework/route";

export default jargonRequest({
    paramsSchema: z.object({
        name: z.string()
    }),
    responseSchema: z.object({
        message: z.string()
    }),
    querySchema: z.object({
        id: z.coerce.number()
    }),
    handler: async ({params, query}) => {
        return {
            message: `People ${params.name} ${query.id}`
        }
    }
});
