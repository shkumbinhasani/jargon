import {z} from "zod";
import {jargonEndpoint} from "../../framework/jargonEndpoint";
import {UserRepository} from "../../src/db/repository/user.repository";

export default jargonEndpoint({
    responseSchema: z.object({
        id: z.number(),
        fullName: z.string(),
        phone: z.string(),
        role: z.enum(['user', 'admin']),
        createdAt: z.date(),
        updatedAt: z.date(),
    }).array(),
    querySchema: z.object({
        filter: z.string().default(''),
        limit: z.coerce.number().max(100).default(20),
        offset: z.coerce.number().default(0)
    }),
    handler: ({query}) => {
        return UserRepository.get(query.filter, query.limit, query.offset);
    }
});
