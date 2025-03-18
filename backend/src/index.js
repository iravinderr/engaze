import dotenv from "dotenv";
dotenv.config({path: "./.env"});
import app from "./app.js";
import connectDB from "./configs/database.configs.js";
import connectCD from "./configs/cloudinary.configs.js";
import { APP_NAME } from "./constants.js";


const PORT = process.env.PORT || 8000;

connectCD();

// CONNECTING SERVER TO THE DATABASE
connectDB().then(() => {
    // STARTING THE SERVER
    app.listen(PORT, () => {
        console.log(`SERVER STARTED AT PORT : ${PORT}`);
    });
});


app.get(`/`, (req, res) => {
    res.send(`${APP_NAME} Services`);
});
