import express from "express";

import categoryController from "../controllers/categoryController.js";

import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router.route("/")
.get(categoryController.getAllCategories)
.post(upload.single("image"), categoryController.insertCategory)

router.route("/:id")
.put(upload.single("image"), categoryController.updateCategory)
.delete(categoryController.deleteCategory);

export default router;