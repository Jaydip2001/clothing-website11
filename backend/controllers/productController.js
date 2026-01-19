import { db } from "../config/db.js"

export const getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
}

export const addProduct = (req, res) => {
  const { name, price, image } = req.body
  const sql = "INSERT INTO products (name, price, image) VALUES (?, ?, ?)"

  db.query(sql, [name, price, image], (err, result) => {
    if (err) return res.status(500).json(err)
    res.json({ message: "Product added successfully" })
  })
}
