import dotenv from "dotenv"
import "dotenv/config";
import connectDB from "./src/db/index.js";
import { app } from "./src/app.js";

dotenv.config({
    path: ".env",
});


const port = process.env.PORT || 8000;
connectDB().then(() => {
    app.on("Error", (err) => {
        console.log(err);
    });
    app.listen(port, () => {
        console.log(` Server running on port: http://localhost:${port}`);
    });
})
    .catch((err) => {
        console.log("MongoDb connection failed !!", err);
    });