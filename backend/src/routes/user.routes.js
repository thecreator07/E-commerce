import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    //In upload middleware will we can use fields to access more than one File from the request Body(frontend)
    upload.single("avatar"),
    registerUser
);

router.route("/login").post(loginUser);
router.route('/logout').post(verifyJwt, logoutUser)

export default router