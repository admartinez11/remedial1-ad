import express from "express";

import productController from "../controllers/productController.js";

import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router.route("/")
.get(productController.getAllProducts)
.post(upload.array("image", 10), productController.insertProducts)

router.route("/:id")
.put(upload.array("image", 10), productController.updateProduct)
.delete(productController.deleteProduct);

export default router;