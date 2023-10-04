import { Router } from "express";
import multer from "multer";
import {
  createLaw,
  deleteLaw,
  rateLaw,
  updateImage,
  updateLaw,
  viewAll,
  viewAllLawyerLaw,
  viewLawyerLaw,
  viewOne,
} from "../controller/LawController";

const myPic = multer().single("image");

const router = Router();

router.route("/:userID/create-law").post(myPic, createLaw);
router.route("/view-all").get(viewAll);
router.route("/:userID/view-one").get(viewOne);
router.route("/:lawID/update-law").patch(updateLaw);
router.route("/:lawID/update-pic").patch(updateImage);
router.route("/:lawID/delete-law").delete(deleteLaw);
router.route("/:userID/:lawID/view-lawyer-laws").get(viewLawyerLaw);
router.route("/:userID/view-lawyer-law").get(viewAllLawyerLaw);
router.route("/:userID/:lawID/rate-law").patch(rateLaw);

export default router;
