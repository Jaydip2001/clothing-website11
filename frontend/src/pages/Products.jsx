import { useEffect, useState } from "react"
import { getProducts } from "../services/productService"

function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then(res => setProducts(res.data))
  }, [])

  return (
    <div>
      <h2>Our Products</h2>
      {products.map(p => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <img src={p.image} width="150" />
        </div>
      ))}
    </div>
  )
}

export default Products
