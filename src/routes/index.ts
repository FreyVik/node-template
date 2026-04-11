import type { Express } from "express";
import infoRouter from "./info";

export function registerRoutes(app: Express): void {
	app.use("/api/info", infoRouter);
}
