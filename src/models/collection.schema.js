import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
        maxLength: [100, "Collection name should not exceed 100 character"]
    }
},{timestamps: true})

export default mongoose.model("Collection", collectionSchema)

//In db Collection will be changed to collections (it will be in lowercase and in pural form).