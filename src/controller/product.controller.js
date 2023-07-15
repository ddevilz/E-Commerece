import formidable from "formidable";
import Product from "../models/product.schema.js"
import { s3FileUpload, s3FileDelete } from "../service/imageUpload.js";
import CustomError from "../utils/customError.js";
import asyncHandler from "../service/asyncHandler.js";
import config from "../config/index.js";
import Mongoose from "mongoose";
import fs from "fs";


export const addProduct = asyncHandler(async (req, res) => {
    const form = formidable({ multiples: true, keepExtensions: true });

    form.parse(req, async function(err, fields, files){
        if (err) {
            throw new CustomError(err.message || "something went wrong", 500)
        }

        const productId = new Mongoose.Types.ObjectId().toHexString()

        console.log(fields, files)

        if (
            !fields.name ||
            !fields.price ||
            !fields.description ||
            !fields.collectionId
        ) {
            throw new CustomError("Please fill all the fields", 500)
        }

        const imgArrayResp = Promise.all(
            Object.keys(files).map( async (file, index) => {
                const element = file[fileKey]
                console.log(element);

                const data = fs.readFileSync(element.filepath)

                const upload =  await s3FileUpload({
                    bucketName: config.S3_BUCKET_NAME,
                    key: `products/${productId}/photo_${index + 1}.png`,
                    body: data,
                    contentType: element.mimetype
                })

                // console.log(upload);
                return {
                    secure_url: upload.Location
                }
            })
        )

        const imgArray = await imgArrayResp

        const product = await Product.create({
            _id: productId,
            photos: imgArray,
            ...fields
        })

        if (!product) {
            throw new CustomError("Product failed to create in DB", 500)
        }

        res.status(200).json({
            success: true,
            product
        })
    })
})


export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    if (!products) {
        throw new CustomError("No products found", 404)
    }

    res.status(200).json({
        success: true,
        products
    })
})

export const getProductById = asyncHandler(async (req, res) => {
    const { id: productId } = req.params

    const product = await Product.findById(productId)

    if (!product) {
        throw new CustomError("No product found", 404)
    }

    res.status(200).json({
        success: true,
        product
    })
})

export const getProductByCollectionId = asyncHandler( async (req, res) => {
    const {id: collectionId} = req.params

    const products = Product.find({collectionId})

    if (!products) {
        throw new CustomError("No product found", 404)
    }

    res.status(200).json({
        success: true,
        products
    })
})

export const updateProduct = asyncHandler(async (req, res) => {
    const { id: productId } = req.params

    const product = await Product.findById(productId)

    if (!product) {
        throw new CustomError("Product not found", 400)
    }

    const form = formidable({ multiples: true, keepExtensions: true });

    form.parse(req, async function(err, fields, files) {
        if (err) {
            throw new CustomError(err.message || "something went wrong", 500)
        }

        

    })    
})

export const deleteProduct = asyncHandler( async (req, res) => {
    const { id: productId } = req.params

    const product = await Product.findById(productId)

    if (!product) {
        throw new CustomError("No product found", 404)
    }

    const deletePhotos = await Promise.all(
        product.photos.map(async (elem, index) => {
            await s3FileDelete({
                bucketName:  config.S3_BUCKET_NAME,
                key: `products/${productId}/photo_${index + 1}.png`
            })
        })
    )

    await deletePhotos

    await product.remove()

    res.status(200).json({
        success: true,
        message: "Product has been deleted successfully"
    })

})