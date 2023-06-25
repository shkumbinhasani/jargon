import {z} from "zod";
import {getRequest} from "../../../../../framework/route";

export default getRequest({
    paramsSchema: z.any(),
    responseSchema: z.any(),
    handler: async ({params}) => {
        return {
            message: `People ${params?.name ?? "World"}`
        }
    }
});
