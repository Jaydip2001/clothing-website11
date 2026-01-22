import { db } from "../config/db.js"

/* ADD CATEGORY */
export const addCategory = (req, res) => {
  const { name, description } = req.body

  db.query(
    "INSERT INTO categories (name, description) VALUES (?, ?)",
    [name, description],
    (err, result) => {
      if (err) return res.status(500).json(err)
      res.json({ message: "Category added successfully" })
    }
  )
}

/* GET ALL CATEGORIES */
export const getCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
}

/* DELETE CATEGORY */
export const deleteCategory = (req, res) => {
  const { id } = req.params

  db.query(
    "DELETE FROM categories WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err)
      res.json({ message: "Category deleted successfully" })
    }
  )
}
