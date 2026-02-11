import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"

function Products() {
  const [products, setProducts] = useState([])
  const location = useLocation()

  const query = new URLSearchParams(location.search)
  const categoryId = query.get("category")

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      const url = categoryId
        ? `http://localhost:5000/api/products?category=${categoryId}`
        : `http://localhost:5000/api/products`

      const res = await axios.get(url)
      setProducts(res.data)
    }

    fetchProducts()
  }, [categoryId])

  /* ================= ADD TO CART ================= */
  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"))

    // 🔹 GUEST USER
    if (!user) {
      const guestCart =
        JSON.parse(localStorage.getItem("guestCart")) || []

      const existing = guestCart.find(
        (item) => item.product_id === product.id
      )

      if (existing) {
        existing.quantity += 1
      } else {
        guestCart.push({
          product_id: product.id,
          quantity: 1
        })
      }

      localStorage.setItem("guestCart", JSON.stringify(guestCart))
      alert("Added to cart (guest)")
      return
    }

    // 🔹 LOGGED-IN USER
    await axios.post("http://localhost:5000/api/cart/add", {
      user_id: user.id,
      product_id: product.id,
      quantity: 1
    })

    alert("Added to cart")
  }

  return (
    <div>
      <h1>Products</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "220px"
            }}
          >
            {p.image && (
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.name}
                width="100%"
                height="150"
                style={{ objectFit: "cover" }}
              />
            )}

            <h3>{p.name}</h3>
            <p>₹{p.price}</p>

            <button onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
