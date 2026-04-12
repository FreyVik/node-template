import type { Express } from "express";
import summaryRouter from "./routes/summary";

export function registerRoutes(app: Express): void {
	app.use("/api/info/summary", summaryRouter);
}
