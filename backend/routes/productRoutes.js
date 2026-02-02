import express from "express"
import multer from "multer"
import {
  addProduct,
  getProducts,
  deleteProduct
} from "../controllers/productController.js"

const router = express.Router()

/* MULTER SETUP */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage })

/* ROUTES */
router.get("/", getProducts)
router.post("/", upload.single("image"), addProduct)
router.delete("/:id", deleteProduct)

export default router
