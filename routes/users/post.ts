import {z} from "zod";
import {jargonRequest} from "../../framework/jargonRequest";

export default jargonRequest({
    bodySchema: z.object({
        name: z.string()
    }),
    handler: async ({params, query, body}) => {
        return {
            params,
            query,
            body
        }
    }
});
