import express from "express";

import brandController from "../controllers/brandController.js";

import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router.route("/")
.get(brandController.getAllBrands)
.post(upload.single("image"), brandController.insertBrand)

router.route("/:id")
.put(upload.single("image"), brandController.updateBrand)
.delete(brandController.deleteBrand);

export default router;