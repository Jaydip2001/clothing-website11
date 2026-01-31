import { useEffect, useState } from "react"
import axios from "axios"

function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)      // ✅ NEW
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:5000/api/categories")
      setCategories(res.data)
    }
    fetchCategories()
  }, [])

  // ✅ ADD or UPDATE with IMAGE
  const addOrUpdateCategory = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    if (image) formData.append("image", image)

    if (editId) {
      await axios.put(
        `http://localhost:5000/api/categories/${editId}`,
        formData
      )
      setEditId(null)
    } else {
      await axios.post(
        "http://localhost:5000/api/categories",
        formData
      )
    }

    setName("")
    setDescription("")
    setImage(null)

    const res = await axios.get("http://localhost:5000/api/categories")
    setCategories(res.data)
  }

  // ✅ DELETE
  const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:5000/api/categories/${id}`)
    const res = await axios.get("http://localhost:5000/api/categories")
    setCategories(res.data)
  }

  return (
    <div>
      <h2>Manage Categories</h2>

      <form onSubmit={addOrUpdateCategory}>
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

        {/* ✅ FILE INPUT (THIS WAS MISSING) */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        /><br /><br />

        <button>
          {editId ? "Update Category" : "Add Category"}
        </button>
      </form>

      <hr />

      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            <b>{cat.name}</b> – {cat.description}
            <br />

            {/* ✅ SHOW IMAGE */}
            {cat.image && (
              <img
                src={`http://localhost:5000/uploads/${cat.image}`}
                width="80"
                alt={cat.name}
              />
            )}

            <br />

            <button onClick={() => {
              setEditId(cat.id)
              setName(cat.name)
              setDescription(cat.description)
              setImage(null)
            }}>
              Edit
            </button>

            <button onClick={() => deleteCategory(cat.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminCategories
