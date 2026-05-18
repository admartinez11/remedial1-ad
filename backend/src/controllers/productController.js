import productModel from "../models/products.js";

import {v2 as cloudinary} from "cloudinary";

//array de funciones
const productController = {};

//select
productController.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find()
        return res.status(200).json(products)
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal serve error"})
    }
}

//insert
productController.insertProducts = async (req, res) => {
    try{
        const { name, phone } = req.body;

        const newProducts = new productModel({
            name,
            category,
            brand,
            price,
            image: req.file.path,
            public_id: req.file.filename,
        });

        await newProduct.save();

        return res.status(200).json({message: "Product saved"})
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "internal serve error"})
    }
};

//update
productController.updateProduct = async (req, res) => {
    try{
        //solicitamos datos
        const {name, category, brand, price,} = req.body;

        const productFound = await productModel.findById(req.params.id)

        const updateData = {
            name,
            category,
            brand,
            price,
        };

        //si viene alguna imagen nueva
        if(req.file){
            //eliminar la img vieja
            await cloudinary.uploader.destroy(productFound.public_id);

            //guardo la nueva img
            updateData.image = req.file.path;
            updateData.public_id = req.file.filename;
        }

        await productModel.findByIdAndUpdate(
            req.params.id, updateData, {new: true}
        )

        return res.status(200).json({message: "Product updated"})
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal serve error"})
    }
};


//delete
productController.deleteProduct = async (req, res) => { 
    try{
        const productFound = await productModel.findById(req.params.id);

        //elimino al usuario de la bd
        await cloudinary.uploader.destroy(productFound.public_id)

        await productModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Product deleted"})
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal serve error"})
    }
}

export default productController;