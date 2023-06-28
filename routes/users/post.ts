import {z} from "zod";
import {jargonEndpoint} from "../../framework/jargonEndpoint";
import {JargonResponse} from "../../framework/JargonResponse";

export default jargonEndpoint({
    responseSchema: z.object({
        message: z.string()
    }),
    bodySchema: z.object({
        name: z.string()
    }),
    handler: async ({body}) => {
        return JargonResponse.created({
            message: `Hello ${body.name}!`
        });
    }
});
