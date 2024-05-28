import {  Router } from "express";
import { Authorize, userAuthenticate, userAuthorization } from "../controllers/user.controller";

const router = Router();

router.get("/checkAuth", userAuthorization);
router.get("/authorize", Authorize);
router.post("/google",  userAuthenticate );


export default router

