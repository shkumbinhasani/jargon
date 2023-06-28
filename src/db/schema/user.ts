import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    fullName: text('full_name').notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    role: text('role', { enum: ['user', 'admin'] }).default('user').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
