import db from "../index";
import {users} from "../schema/user";
import {eq, like} from "drizzle-orm";

export class UserRepository {
    static async getById(id: number) {
        return db.select().from(users).where(eq(users.id, id))
    }

    static async get(filter: string, limit: number, offset: number) {
        return db.select().from(users).where(like(users.fullName, `%${filter}%`)).limit(limit).offset(offset);
    }

    static async create(fullName: string, phone: string) {
        return db.insert(users).values({
            fullName,
            phone,
        });
    }

    static async update(id: number, fullName: string, phone: string) {
        return db.update(users).set({
            fullName,
            phone,
        }).where(eq(users.id, id));
    }

    static async delete(id: number) {
        return db.delete(users).where(eq(users.id, id));
    }
}
