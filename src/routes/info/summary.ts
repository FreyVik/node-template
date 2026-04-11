import { Router } from "express";

const router: Router = Router();

router.get("/", (_req, res) => {
	res.status(200).json({
		total: 3000,
		currency: "USD",
	});
});

export default router;
