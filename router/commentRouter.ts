import {Router} from "express"
import { createComment, deleteComment } from "../controller/commentController"


const router = Router()

router.route("/:userID/:lawID/create-comment").post(createComment)
router.route("/:userID/:commentID/delete-comment").delete(deleteComment)

export default router