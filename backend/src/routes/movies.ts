import { Router} from "express";
import { getMovies, uploadMovie } from "../controllers/movie.controllers";
import { userAuthorization } from "../controllers/user.controller";


const router = Router();

router.get("/",  getMovies);
router.post("/", userAuthorization, uploadMovie);


export default router