import { Router } from "express";
import {
  changePassword,
  deleteUser,
  getAll,
  registerUser,
  resetPassword,
  signInUser,
  updateAvatar,
  verifyUser,
} from "../controller/authController";
import validatorHandler from "../utils/validatorHandler";
import {
  changeValidator,
  createValidator,
  resetValidator,
  signInValidator,
} from "../utils/validators";
import multer from "multer";

const myUpload = multer().single("avatar");

const router = Router();

router.route("/register").post(validatorHandler(createValidator), registerUser);
router.route("/sign-in").post(validatorHandler(signInValidator), signInUser);
router
  .route("/:token/change-password")
  .patch(validatorHandler(changeValidator), changePassword);
router
  .route("/reset-password")
  .patch(validatorHandler(resetValidator), resetPassword);
router.route("/:userID/delete-user").delete(deleteUser);
router.route("/get-all").get(getAll);
router.route("/:token/verify").get(verifyUser);
router.route("/:userID/update-avatar").patch(myUpload, updateAvatar);

export default router;
