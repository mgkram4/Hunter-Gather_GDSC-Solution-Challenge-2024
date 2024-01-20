import { Database } from "./types.ts";

export type Tables = Database["public"]["Tables"];

export type User = Tables["users"];
export type NewUser = User["Insert"];
