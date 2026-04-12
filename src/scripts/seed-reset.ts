import { env } from "../config/env";
import {
	closeDatabase,
	getDatabase,
	initializeDatabase,
} from "../models/database";
import { SEED_SQL } from "./seed-queries";

const RESET_SQL = `
DELETE FROM transactions;
DELETE FROM categories;
DELETE FROM accounts;
DELETE FROM sqlite_sequence WHERE name IN ('transactions', 'categories', 'accounts');
`;

function execAsync(
	db: ReturnType<typeof getDatabase>,
	sql: string,
): Promise<void> {
	return new Promise((resolve, reject) => {
		db.exec(sql, (err) => {
			if (err) return reject(err);
			resolve();
		});
	});
}

async function resetData(): Promise<void> {
	if (env.NODE_ENV === "production") {
		throw new Error("seed:reset is disabled in production.");
	}

	try {
		await initializeDatabase();
		const db = getDatabase();

		await execAsync(db, RESET_SQL);
		await execAsync(db, SEED_SQL);
		console.log("Database reset and seed completed successfully.");
	} finally {
		await closeDatabase();
	}
}

void resetData().catch((error) => {
	console.error("Seed reset failed:", error);
	process.exit(1);
});
