import { Routes, Route } from "react-router-dom"

// user pages
import Home from "./pages/Home"
import Products from "./pages/Products"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AdminCategories from "./admin/AdminCategories"
// admin pages
import AdminLogin from "./admin/AdminLogin"
import AdminRegister from "./admin/AdminRegister"
import AdminDashboard from "./admin/AdminDashboard"

function App() {
  return (
    <Routes>
      {/* USER ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ADMIN ROUTES */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/categories" element={<AdminCategories />} />
    </Routes>
  )
}

export default App
