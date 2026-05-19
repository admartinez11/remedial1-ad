import categoryModel from "../models/categories.js";

import {v2 as cloudinary} from "cloudinary";

//array de funciones
const categoryController = {};

//select
categoryController.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find()
        return res.status(200).json(categories)
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal serve error"})
    }
}

//insert
categoryController.insertCategory = async (req, res) => {
    try{
        const { name, phone } = req.body;

        const newCategories = new categoryModel({
            name,
            description,
            image: req.file.path,
            public_id: req.file.filename,
        });

        await newCategory.save();

        return res.status(200).json({message: "Category saved"})
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "internal serve error"})
    }
};

//update
categoryController.updateCategory = async (req, res) => {
    try{
        //solicitamos datos
        const {name, description} = req.body;

        const categoryFound = await categoryModel.findById(req.params.id)

        const updateData = {
            name,
            description
        };

        //si viene alguna imagen nueva
        if(req.file){
            //eliminar la img vieja
            await cloudinary.uploader.destroy(categoryFound.public_id);

            //guardo la nueva img
            updateData.image = req.file.path;
            updateData.public_id = req.file.filename;
        }

        await categoryModel.findByIdAndUpdate(
            req.params.id, updateData, {new: true}
        )

        return res.status(200).json({message: "Category updated"})
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal serve error"})
    }
};


//delete
categoryController.deleteCategory = async (req, res) => { 
    try{
        const categoryFound = await categoryModel.findById(req.params.id);

        //elimino al usuario de la bd
        await cloudinary.uploader.destroy(categoryFound.public_id)

        await categoryModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Category deleted"})
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal serve error"})
    }
}

export default categoryController;