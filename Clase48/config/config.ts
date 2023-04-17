import { load } from "../deps.ts"

const env = await load();
export const PORT = env["PORT"]
export const DATABASE_CLUSTER = env["DATABASE_CLUSTER"]
export const DATABASE_USER = env["DATABASE_USER"]
export const DATABASE_PASSWORD = env["DATABASE_PASSWORD"]
export const DATABASE_NAME = env["DATABASE_NAME"]
