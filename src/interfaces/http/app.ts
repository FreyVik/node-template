import cors from "cors";
import express from "express";
import helmet from "helmet";
import { registerRoutes } from "./register-routes";

const app: express.Express = express();

// Global middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Test route
app.get("/api/health", (_req, res) => {
	res.status(200).json({ status: "OK", message: "API is healthy" });
});

registerRoutes(app);

export default app;
