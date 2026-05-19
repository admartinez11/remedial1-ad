import brandModel from "../models/brands.js";

import {v2 as cloudinary} from "cloudinary";

//array de funciones
const brandController = {};

//select
brandController.getAllBrands = async (req, res) => {
    try {
        const brands = await brandModel.find()
        return res.status(200).json(brands)
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal serve error"})
    }
}

//insert
brandController.insertBrand = async (req, res) => {
    try{
        const { name, phone } = req.body;

        const newBrands = new brandModel({
            name,
            country,
            description,
            image: req.file.path,
            public_id: req.file.filename,
        });

        await newBrand.save();

        return res.status(200).json({message: "Brand saved"})
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "internal serve error"})
    }
};

//update
brandController.updateBrand = async (req, res) => {
    try{
        //solicitamos datos
        const {name, description} = req.body;

        const brandFound = await brandModel.findById(req.params.id)

        const updateData = {
            name,
            description
        };

        //si viene alguna imagen nueva
        if(req.file){
            //eliminar la img vieja
            await cloudinary.uploader.destroy(brandFound.public_id);

            //guardo la nueva img
            updateData.image = req.file.path;
            updateData.public_id = req.file.filename;
        }

        await brandModel.findByIdAndUpdate(
            req.params.id, updateData, {new: true}
        )

        return res.status(200).json({message: "Brand updated"})
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal serve error"})
    }
};


//delete
brandController.deleteBrand = async (req, res) => { 
    try{
        const brandFound = await brandModel.findById(req.params.id);

        //elimino al usuario de la bd
        await cloudinary.uploader.destroy(brandFound.public_id)

        await brandModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Brand deleted"})
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal serve error"})
    }
}

export default brandController;