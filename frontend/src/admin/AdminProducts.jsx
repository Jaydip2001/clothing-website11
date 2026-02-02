import { useEffect, useState } from "react"
import axios from "axios"

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [form, setForm] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    image: null,
    stock: ""
  })

  /* LOAD DATA */
  useEffect(() => {
    const loadData = async () => {
      const c = await axios.get("http://localhost:5000/api/categories")
      const p = await axios.get("http://localhost:5000/api/products")

      setCategories(c.data)
      setProducts(p.data)
    }

    loadData()
  }, [])

  /* ADD PRODUCT */
  const handleAdd = async (e) => {
    e.preventDefault()

    const data = new FormData()

    data.append("category_id", form.category_id)
    data.append("name", form.name)
    data.append("description", form.description)
    data.append("price", form.price)
    data.append("stock", form.stock)
    data.append("image", form.image)

    await axios.post("http://localhost:5000/api/products", data)

    const p = await axios.get("http://localhost:5000/api/products")
    setProducts(p.data)

    setForm({
      category_id: "",
      name: "",
      description: "",
      price: "",
      image: null,
      stock: ""
    })
  }

  /* DELETE */
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`)
    const p = await axios.get("http://localhost:5000/api/products")
    setProducts(p.data)
  }

  return (
    <div>
      <h2>Admin Products</h2>

      <form onSubmit={handleAdd}>
        <select
          value={form.category_id}
          onChange={e => setForm({ ...form, category_id: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select><br /><br />

        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        /><br /><br />

        <input
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        /><br /><br />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        /><br /><br />

        <input
          type="file"
          onChange={e =>
            setForm({ ...form, image: e.target.files[0] })
          }
        /><br /><br />

        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={e => setForm({ ...form, stock: e.target.value })}
        /><br /><br />

        <button>Add Product</button>
      </form>

      <hr />

      {products.map(p => (
        <div key={p.id}>
          <img
            src={`http://localhost:5000/uploads/${p.image}`}
            width="80"
            alt=""
          />
          <b> {p.name}</b> ({p.category}) - ₹{p.price}
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default AdminProducts
