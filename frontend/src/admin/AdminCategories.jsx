import { useEffect, useState } from "react"
import axios from "axios"

function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:5000/api/categories")
      setCategories(res.data)
    }

    fetchCategories()
  }, []) // ✅ ESLint satisfied

  const addCategory = async (e) => {
    e.preventDefault()

    await axios.post("http://localhost:5000/api/categories", {
      name,
      description
    })

    setName("")
    setDescription("")

    const res = await axios.get("http://localhost:5000/api/categories")
    setCategories(res.data)
  }

  const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:5000/api/categories/${id}`)

    const res = await axios.get("http://localhost:5000/api/categories")
    setCategories(res.data)
  }

  return (
    <div>
      <h2>Manage Categories</h2>

      <form onSubmit={addCategory}>
        <input
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br /><br />

        <button>Add Category</button>
      </form>

      <hr />

      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            <b>{cat.name}</b> – {cat.description}
            <button onClick={() => deleteCategory(cat.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminCategories
