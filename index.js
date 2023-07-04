import mongoose from "mongoose";
import app from "./src/app.js";
import config from "./src/config/index.js";

// iife(Immediately Invoked Function Expression)
(async () => {
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.log("connected to db");

        app.on("error", (err) => {
            console.error("Error: ", err);
            throw err
        })

        const onListening = () => {
            console.log(`listening on  port ${config.PORT}`)
        }

        app.listen(config.PORT, onListening)

    } catch(err) {
        console.error("Error: ", err);
        throw err
    }
})()
