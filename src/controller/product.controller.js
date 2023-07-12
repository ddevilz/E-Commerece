import formidable from "formidable";
import Product from "../models/product.schema.js"
import { s3FileUpload, s3FileDelete } from "../service/imageUpload.js";
import CustomError from "../utils/customError.js";
import asyncHandler from "../service/asyncHandler.js";
import config from "../config/index.js";
import Mongoose from "mongoose";


export const addProduct = asyncHandler(async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async function(err, fields, files){
        if (err) {
            new CustomError(err.message || "something went wrong", 500)
        }

        const productId = new Mongoose.Types.ObjectId().toHexString()

        console.log(fields, files)
    })
})