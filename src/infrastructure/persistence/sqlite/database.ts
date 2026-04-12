import { mkdir } from "node:fs/promises";
import path from "node:path";
import sqlite3 from "sqlite3";
import { env } from "../../../shared/config/env";
import { SCHEMA_SQL } from "./schema";

let db: sqlite3.Database | null = null;

function openDatabase(dbPath: string): Promise<sqlite3.Database> {
	return new Promise((resolve, reject) => {
		const instance = new sqlite3.Database(dbPath, (err) => {
			if (err) return reject(err);
			resolve(instance);
		});
	});
}

function execAsync(instance: sqlite3.Database, sql: string): Promise<void> {
	return new Promise((resolve, reject) => {
		instance.exec(sql, (err) => (err ? reject(err) : resolve()));
	});
}

export async function initializeDatabase(): Promise<void> {
	if (db) return;

	const dbDir = path.dirname(env.DATABASE_PATH);
	await mkdir(dbDir, { recursive: true });

	const instance = await openDatabase(env.DATABASE_PATH);

	await execAsync(instance, "PRAGMA foreign_keys = ON;");
	await execAsync(instance, "PRAGMA journal_mode = WAL;");
	await execAsync(instance, "PRAGMA busy_timeout = 5000;");

	await execAsync(instance, SCHEMA_SQL);
	db = instance;

	console.log(`SQLite initialized at: ${env.DATABASE_PATH}`);
}

export function getDatabase(): sqlite3.Database {
	if (!db) {
		throw new Error(
			"Database not initialized. Call initializeDatabase() first.",
		);
	}

	return db;
}

export async function closeDatabase(): Promise<void> {
	if (!db) return;

	const instance = db;

	await new Promise<void>((resolve, reject) => {
		instance.close((err) => (err ? reject(err) : resolve()));
	});

	db = null;
}
