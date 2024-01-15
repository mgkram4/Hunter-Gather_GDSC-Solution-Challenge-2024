import { drizzle } from "drizzle-orm/postgres-js";
import { POSTGRES_CONNECTION_STRING } from "@config/constants";
import postgres from "postgres";

const client = postgres(POSTGRES_CONNECTION_STRING, {
  prepare: false,
});
export const db = drizzle(client);
