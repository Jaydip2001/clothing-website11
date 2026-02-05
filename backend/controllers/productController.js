import { db } from "../config/db.js"
import { addInventoryLog } from "./inventoryController.js"

/* ================= GET PRODUCTS ================= */
export const getProducts = (req, res) => {
  db.query(
    `SELECT p.*, c.name AS category
     FROM products p
     JOIN categories c ON p.category_id = c.id`,
    (err, result) => {
      if (err) return res.status(500).json(err)
      res.json(result)
    }
  )
}


/* ================= ADD PRODUCT ================= */
export const addProduct = (req, res) => {
  const { category_id, name, description, price, stock } = req.body
  const image = req.file ? req.file.filename : null

  db.query(
    `INSERT INTO products
     (category_id,name,description,price,image,stock)
     VALUES (?,?,?,?,?,?)`,
    [category_id, name, description, price, image, stock],
    (err, result) => {
      if (err) return res.status(500).json(err)

      /* 🔥 INVENTORY LOG (NEW) */
      const insertId = result.insertId
      addInventoryLog(insertId, "ADD", stock)

      res.json({ message: "Product added successfully" })
    }
  )
}


/* ================= UPDATE PRODUCT ================= */
export const updateProduct = (req, res) => {
  const { id } = req.params
  const { category_id, name, description, price, stock } = req.body
  const image = req.file ? req.file.filename : null

  const valuesWithImage = [
    category_id, name, description, price, image, stock, id
  ]

  const valuesWithoutImage = [
    category_id, name, description, price, stock, id
  ]

  const sqlWithImage = `
    UPDATE products
    SET category_id=?,name=?,description=?,price=?,image=?,stock=?
    WHERE id=?`

  const sqlWithoutImage = `
    UPDATE products
    SET category_id=?,name=?,description=?,price=?,stock=?
    WHERE id=?`

  db.query(
    image ? sqlWithImage : sqlWithoutImage,
    image ? valuesWithImage : valuesWithoutImage,
    (err) => {
      if (err) return res.status(500).json(err)

      /* 🔥 INVENTORY LOG (NEW) */
      addInventoryLog(id, "UPDATE", stock)

      res.json({ message: "Updated successfully" })
    }
  )
}


/* ================= DELETE PRODUCT ================= */
export const deleteProduct = (req, res) => {
  db.query("DELETE FROM products WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err)
    res.json({ message: "Deleted successfully" })
  })
}
