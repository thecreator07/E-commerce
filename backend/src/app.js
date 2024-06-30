import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from "url"

const app = express()

app.use(
    cors({
        origin: [
            "https://e-commerce-bkd2.onrender.com",
            "http://localhost:5173",
            "http://localhost:8000",
        ],
        credentials: true,
    })
)

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.json({ limit: "2000kb" }))
app.use(express.urlencoded({ extended: true, limit: "2000kb" }))
app.use(express.static(path.join(__dirname, "../dist")))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/cart", cartRouter)

export { app }