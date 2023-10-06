"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const LawController_1 = require("../controller/LawController");
const myPic = (0, multer_1.default)().single("image");
const router = (0, express_1.Router)();
router.route("/:userID/create-law").post(myPic, LawController_1.createLaw);
router.route("/view-all").get(LawController_1.viewAll);
router.route("/:lawID/view-one").get(LawController_1.viewOne);
router.route("/:lawID/update-law").patch(LawController_1.updateLaw);
router.route("/:lawID/update-pic").patch(myPic, LawController_1.updateImage);
router.route("/:userID/:lawID/delete-law").delete(LawController_1.deleteLaw);
router.route("/:userID/:lawID/view-lawyer-laws").get(LawController_1.viewLawyerLaw);
router.route("/:userID/view-lawyer-law").get(LawController_1.viewAllLawyerLaw);
router.route("/:userID/:lawID/rate-law").patch(LawController_1.rateLaw);
exports.default = router;
