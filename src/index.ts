import {
	closeDatabase,
	initializeDatabase,
} from "./infrastructure/persistence/sqlite/database";
import app from "./interfaces/http/app";
import { env } from "./shared/config/env";

async function bootstrap() {
	try {
		await initializeDatabase();
		app.listen(env.PORT, () => {
			console.log(`Server running on port ${env.PORT}`);
			console.log(`Health: http://localhost:${env.PORT}/api/health`);
		});
	} catch (error) {
		console.error("Failed to start application:", error);
		process.exit(1);
	}
}

void bootstrap();

process.on("SIGINT", async () => {
	await closeDatabase();
	process.exit(0);
});

process.on("SIGTERM", async () => {
	await closeDatabase();
	process.exit(0);
});
