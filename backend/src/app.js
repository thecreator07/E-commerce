import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: ['http://localhost:5173'], //urls to give access
        credentials: true,
    })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));

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
