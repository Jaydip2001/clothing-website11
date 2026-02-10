import { db } from "../config/db.js"
import { addInventoryLog } from "./inventoryController.js"

<<<<<<< HEAD
/* ================= GET PRODUCTS (ADMIN + USER) ================= */
export const getProducts = (req, res) => {
  const { category } = req.query   // 👈 read category from URL

  let sql = `
    SELECT p.*, c.name AS category
    FROM products p
    JOIN categories c ON p.category_id = c.id
  `
  const params = []

  // ✅ USER SIDE FILTER
  if (category) {
    sql += " WHERE p.category_id = ?"
    params.push(category)
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
}

=======
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


>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029
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

<<<<<<< HEAD
      // 🔥 INVENTORY LOG
      addInventoryLog(result.insertId, "ADD", stock)
=======
      /* 🔥 INVENTORY LOG (NEW) */
      const insertId = result.insertId
      addInventoryLog(insertId, "ADD", stock)
>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029

      res.json({ message: "Product added successfully" })
    }
  )
}

<<<<<<< HEAD
=======

>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029
/* ================= UPDATE PRODUCT ================= */
export const updateProduct = (req, res) => {
  const { id } = req.params
  const { category_id, name, description, price, stock } = req.body
  const image = req.file ? req.file.filename : null

<<<<<<< HEAD
  const sql = image
    ? `UPDATE products SET category_id=?,name=?,description=?,price=?,image=?,stock=? WHERE id=?`
    : `UPDATE products SET category_id=?,name=?,description=?,price=?,stock=? WHERE id=?`

  const values = image
    ? [category_id, name, description, price, image, stock, id]
    : [category_id, name, description, price, stock, id]

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json(err)

    // 🔥 INVENTORY LOG
    addInventoryLog(id, "UPDATE", stock)

    res.json({ message: "Updated successfully" })
  })
}

=======
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


>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029
/* ================= DELETE PRODUCT ================= */
export const deleteProduct = (req, res) => {
  db.query("DELETE FROM products WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err)
    res.json({ message: "Deleted successfully" })
  })
}
