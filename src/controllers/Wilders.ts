import express, {Request,Response,NextFunction, request} from "express";
import WilderModel from "../models/Wilder";

 const controllers = {

    create: async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
        await WilderModel.init();
        const wilder = new WilderModel(req.body);
        const result = await wilder.save();
        res.json(result);
        } catch (error:any) {
        if(error.code === 11000)
        res.status(400).json({message : "Name already taken!"});
        next(error);
        }
    },

    read : async(req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            const wilders = await WilderModel.find({})
            res.json({ wilders })
        } catch (err) {
            next(err);
        } 
    },

    readOne : async(req:Request, res:Response, next:NextFunction) => {
        try {
            const wilder = await WilderModel.findById(req.params.id);
            res.json({ wilder });
        } catch (err) {
            next(err);
        }
    },

    update : async(req:Request, res:Response, next:NextFunction) => {
        try {
            const wilder = await WilderModel.findById(req.params.id);
            if(wilder){
              await wilder.save()  
            }
            res.json(wilder);

        } catch (err) {
            next(err);
        }
    },

    delete : async(req:Request, res:Response, next:NextFunction) => {
        try {
            const wilder = await WilderModel.findById(req.params.id)
            res.json(wilder);
            if(wilder){
              wilder.remove();  
            }
        
        } catch (err) {
            next(err);
        }
    }
}
export default controllers;