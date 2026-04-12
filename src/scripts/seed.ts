import {
	closeDatabase,
	getDatabase,
	initializeDatabase,
} from "../models/database";
import { SEED_SQL } from "./seed-queries";

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

export async function runSeed(): Promise<void> {
	try {
		await initializeDatabase();
		const db = getDatabase();

		await execAsync(db, SEED_SQL);
		console.log("Seed completed successfully.");
	} finally {
		await closeDatabase();
	}
}

void runSeed().catch((error) => {
	console.error("Seed failed:", error);
	process.exit(1);
});
