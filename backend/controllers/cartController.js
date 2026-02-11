import { db } from "../config/db.js"

/* ================= ADD TO CART (LOGGED-IN USER) ================= */
export const addToCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body

  db.query(
    "SELECT * FROM cart WHERE user_id=? AND product_id=?",
    [user_id, product_id],
    (err, result) => {
      if (err) return res.status(500).json(err)

      if (result.length > 0) {
        db.query(
          "UPDATE cart SET quantity = quantity + ? WHERE user_id=? AND product_id=?",
          [quantity, user_id, product_id],
          () => res.json({ message: "Cart updated" })
        )
      } else {
        db.query(
          "INSERT INTO cart (user_id, product_id, quantity) VALUES (?,?,?)",
          [user_id, product_id, quantity],
          () => res.json({ message: "Added to cart" })
        )
      }
    }
  )
}

/* ================= GET CART ITEMS ================= */
export const getCart = (req, res) => {
  const { user_id } = req.params

  const sql = `
    SELECT 
      c.id,
      c.quantity,
      p.id AS product_id,
      p.name,
      p.price,
      p.image
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `

  db.query(sql, [user_id], (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
}

/* ================= MERGE GUEST CART AFTER LOGIN ================= */
export const mergeGuestCart = (req, res) => {
  const { user_id, cartItems } = req.body

  if (!cartItems || cartItems.length === 0) {
    return res.json({ message: "No guest cart to merge" })
  }

  cartItems.forEach(item => {
    db.query(
      "SELECT * FROM cart WHERE user_id=? AND product_id=?",
      [user_id, item.product_id],
      (err, result) => {
        if (err) return

        if (result.length > 0) {
          // already exists → increase quantity
          db.query(
            "UPDATE cart SET quantity = quantity + ? WHERE user_id=? AND product_id=?",
            [item.quantity, user_id, item.product_id]
          )
        } else {
          // insert new product
          db.query(
            "INSERT INTO cart (user_id, product_id, quantity) VALUES (?,?,?)",
            [user_id, item.product_id, item.quantity]
          )
        }
      }
    )
  })

  res.json({ message: "Guest cart merged successfully" })
}
/* ================= UPDATE CART QUANTITY ================= */
export const updateCartQuantity = (req, res) => {
  const { cart_id, quantity } = req.body

  if (quantity < 1) {
    return res.status(400).json({ message: "Invalid quantity" })
  }

  db.query(
    "UPDATE cart SET quantity=? WHERE id=?",
    [quantity, cart_id],
    (err) => {
      if (err) return res.status(500).json(err)
      res.json({ message: "Quantity updated" })
    }
  )
}

/* ================= REMOVE CART ITEM ================= */
export const removeCartItem = (req, res) => {
  const { cart_id } = req.params

  db.query(
    "DELETE FROM cart WHERE id=?",
    [cart_id],
    (err) => {
      if (err) return res.status(500).json(err)
      res.json({ message: "Item removed" })
    }
  )
}
