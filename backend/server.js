import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { db } from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/products", productRoutes)

app.get("/", (req, res) => {
  res.send("Clothing Store API is running 🚀")
})
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000")
})
