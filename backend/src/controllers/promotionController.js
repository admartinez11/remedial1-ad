import promotionsModel from "../models/promotions.js";

import {v2 as cloudinary} from "cloudinary";

//array de funciones
const promotionController = {};

//select
promotionController.getAllPromotions = async (req, res) => {
    try {
        const promotions = await promotionsModel.find()
        return res.status(200).json(promotions)
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal serve error"})
    }
}

//insert
promotionController.insertPromotion = async (req, res) => {
    try{
        const { title, description, discount, expiration_date } = req.body;

        const images = req.files.map(file => ({ 
            image: file.path, 
            image_id: file.filename 
        }));

        const promotion = new promotionsModel({ 
            title, 
            description, 
            discount, 
            expiration_date, 
            images 
        });

        await promotion.save();

        return res.status(200).json({message: "Promotion saved"})
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "internal serve error"})
    }
};

//update
promotionController.updatePromotion = async (req, res) => {
    try{
        //solicitamos datos
        const {title, description, discount, expiration_date } = req.body;

        const promotion = await promotionsModel.findById(req.params.id);
            
        const updateData = { 
            title, 
            description, 
            discount, 
            expiration_date 
        };
            
        await promotionsModel.findByIdAndUpdate(
            req.params.id, updateData, { new: true }
        );

        return res.status(200).json({message: "Promotion updated"})
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal serve error"})
    }
};


//delete
promotionController.deletePromotion = async (req, res) => { 
    try{
        const promotionFound = await promotionsModel.findById(req.params.id);

        //elimino la promoción de la bd
        await cloudinary.uploader.destroy(promotionFound.image_id);

        await promotionsModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Promotion deleted"})
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal serve error"})
    }
}

export default promotionController;