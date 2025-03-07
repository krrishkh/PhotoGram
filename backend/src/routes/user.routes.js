import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middlewares.js"
import { upload } from "../middlewares/multer.middlewares.js"

import {
    getFeed,
    likePost,
    loginUser,
    registerUser,
    uploadPost
} from "../controllers/user.controllers.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/upload").post(verifyJWT, upload.single("image"), uploadPost)
router.route("/feed").get(verifyJWT, getFeed)
router.route("/likePost").post(verifyJWT,likePost)
 
export default router