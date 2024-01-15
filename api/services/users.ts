import { NewUser } from "@api/models/users";
import { UserRepository } from "@api/repositories";

/**
 * Service function to get all users.
 *
 * @returns {Promise<User[]>}
 */
export const getAllUsers = async () => {
  return await UserRepository.getAllUsers();
};

/**
 * Service function to get a user by id.
 *
 * @param {number} id
 * @returns {Promise<User>}
 */
export const getUserById = async (id: number) => {
  return await UserRepository.getUserById(id);
};

/**
 * Service function to get a user by email.
 *
 * @param {string} email
 * @returns {Promise<User>}
 */
export const getUserByEmail = async (email: string) => {
  return await UserRepository.getUserByEmail(email);
};

/**
 * Service function to create a user.
 *
 * @param {NewUser} user
 * @returns {Promise<User>}
 */
export const createUser = async (user: NewUser) => {
  // TODO also add a user on auth side with supabase
  return await UserRepository.createUser(user);
};

/**
 * Service function to update a user by id.
 *
 * @param {number} id
 * @param {Partial<User>} user
 * @returns {Promise<User>}
 */
export const updateUserById = async (id: number, user: Partial<NewUser>) => {
  return await UserRepository.updateUserById(id, user);
};
