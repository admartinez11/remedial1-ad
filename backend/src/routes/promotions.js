import express from "express";

import promotionController from "../controllers/promotionController.js";

import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router.route("/")
.get(promotionController.getAllPromotions)
.post(upload.array("image", 10), promotionController.insertPromotion)

router.route("/:id")
.put(upload.array("image", 10), promotionController.updatePromotion)
.delete(promotionController.deletePromotion);

export default router;