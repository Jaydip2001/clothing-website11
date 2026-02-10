import { useEffect, useState } from "react"
import axios from "axios"

function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
<<<<<<< HEAD
  const [image, setImage] = useState(null)
  const [editId, setEditId] = useState(null)

  /* ================= LOAD CATEGORIES ================= */
  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories")
    setCategories(res.data)
  }

  useEffect(() => {
    const loadCategories = async () => {
      const res = await axios.get("http://localhost:5000/api/categories")
      setCategories(res.data)
    }
    loadCategories()
  }, [])

  /* ================= ADD / UPDATE ================= */
=======
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
>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029
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

<<<<<<< HEAD
    fetchCategories()
  }

  /* ================= DELETE ================= */
  const deleteCategory = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/categories/${id}`)
    const res = await axios.get("http://localhost:5000/api/categories")
    setCategories(res.data)
  } catch (err) {
    alert(err.response.data.message)
  }
}



  /* ================= UI ================= */
=======
    const res = await axios.get("http://localhost:5000/api/categories")
    setCategories(res.data)
  }

  // ✅ DELETE
  const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:5000/api/categories/${id}`)
    const res = await axios.get("http://localhost:5000/api/categories")
    setCategories(res.data)
  }

>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029
  return (
    <div>
      <h2>Manage Categories</h2>

      <form onSubmit={addOrUpdateCategory}>
        <input
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
<<<<<<< HEAD
        />
        <br /><br />
=======
        /><br /><br />
>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
<<<<<<< HEAD
        />
        <br /><br />

=======
        /><br /><br />

        {/* ✅ FILE INPUT (THIS WAS MISSING) */}
>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
<<<<<<< HEAD
        />
        <br /><br />

        <button type="submit">
=======
        /><br /><br />

        <button>
>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029
          {editId ? "Update Category" : "Add Category"}
        </button>
      </form>

      <hr />

      <ul>
<<<<<<< HEAD
        {categories.map((cat) => (
          <li key={cat.id} style={{ marginBottom: "20px" }}>
            <b>{cat.name}</b> – {cat.description}
            <br />

            {cat.image && (
              <img
                src={`http://localhost:5000/uploads/${cat.image}`}
                width="100"
=======
        {categories.map(cat => (
          <li key={cat.id}>
            <b>{cat.name}</b> – {cat.description}
            <br />

            {/* ✅ SHOW IMAGE */}
            {cat.image && (
              <img
                src={`http://localhost:5000/uploads/${cat.image}`}
                width="80"
>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029
                alt={cat.name}
              />
            )}

<<<<<<< HEAD
            <br /><br />

            <button
              type="button"
              onClick={() => {
                setEditId(cat.id)
                setName(cat.name)
                setDescription(cat.description)
                setImage(null)
              }}
            >
              Edit
            </button>

            {" "}

            <button
              type="button"
              onClick={() => deleteCategory(cat.id)}
            >
=======
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
>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminCategories
