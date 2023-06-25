import {z} from "zod";
import {getRequest} from "../../framework/route";

export default getRequest({
    paramsSchema: z.object({
        name: z.string()
    }),
    responseSchema: z.object({
        message: z.string()
    }),
    handler: async ({params}) => {
        return {
            message: `People ${params?.name ?? "World"}`
        }
    }
});
