import { Request, Response, Router } from "express";
import { studentsRoutes } from "../controllers/StudentController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.json({ ok: "200" });
});
router.use(studentsRoutes);

export { router };
