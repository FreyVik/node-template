import dotenv from "dotenv";

dotenv.config();

export const env = {
	PORT: Number(process.env.PORT ?? 4000),
	DATABASE_PATH: process.env.DATABASE_PATH ?? "./data/freyr_finances.sqlite",
	NODE_ENV: process.env.NODE_ENV ?? "development",
};

if (Number.isNaN(env.PORT)) {
	throw new Error("PORT must be a valid number");
}
