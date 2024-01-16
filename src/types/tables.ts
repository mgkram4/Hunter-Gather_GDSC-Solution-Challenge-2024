import { Database } from "./supabase";

export type Tables = Database["public"]["Tables"];

export type User = Tables["Users"];
export type NewUser = User["Insert"];
