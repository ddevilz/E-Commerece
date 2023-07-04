import dotenv from "dotenv";

dotenv.config()

const config = {
    MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017/ecomm",
    PORT: process.env.PORT || 5000
}

export default config