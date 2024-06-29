import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url"

const app = express();

app.use(
    cors({
        origin: ['http://localhost:5173'] || "*", //urls to give access
        credentials: true,
    })
);

const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.log(__dirname)
// console.log(dummy)
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../dist")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"))
})

app.use(cookieParser());
//Router import
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter)
app.use('/api/v1/cart', cartRouter)

//http://localhost:8000/api/v1/users/register
export { app };
