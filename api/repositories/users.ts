import { db } from "@api/drizzle";
import { NewUser, users } from "@api/models/users";
import { eq } from "drizzle-orm";

/**
 * Repository function to get all users.
 *
 * @returns {Promise<User[]>}
 */
export const getAllUsers = async () => {
  return await db.select().from(users);
};

/**
 * Repository function to get a user by id.
 *
 * @param {number} id
 * @returns {Promise<User>}
 */
export const getUserById = async (id: number) => {
  return await db.select().from(users).where(eq(users.id, id));
};

/**
 * Repository function to get a user by email.
 *
 * @param {string} email
 * @returns {Promise<User>}
 */
export const getUserByEmail = async (email: string) => {
  return await db.select().from(users).where(eq(users.email, email));
};

/**
 * Repository function to create a user.
 *
 * @param {NewUser} user
 * @returns {Promise<User>}
 */
export const createUser = async (user: NewUser) => {
  return await db.insert(users).values(user);
};

/**
 * Repository function to update a user by id.
 *
 * @param {number} id
 * @param {Partial<User>} user
 * @returns {Promise<User>}
 */
export const updateUserById = async (id: number, user: Partial<NewUser>) => {
  return await db.update(users).set(user).where(eq(users.id, id));
};
