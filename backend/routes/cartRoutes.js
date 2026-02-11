import express from "express"
import {
  addToCart,
  getCart,
  mergeGuestCart,
  updateCartQuantity,
  removeCartItem
} from "../controllers/cartController.js"

const router = express.Router()

router.post("/add", addToCart)
router.get("/:user_id", getCart)
router.post("/merge", mergeGuestCart)
router.put("/update", updateCartQuantity)
router.delete("/remove/:cart_id", removeCartItem)

export default router
