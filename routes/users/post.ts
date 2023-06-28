import {z} from "zod";
import {jargonEndpoint} from "../../framework/jargonEndpoint";

export default jargonEndpoint({
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
