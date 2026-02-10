import { Routes, Route } from "react-router-dom"

// user pages
import Home from "./pages/Home"
import Products from "./pages/Products"
import Login from "./pages/Login"
import Register from "./pages/Register"
<<<<<<< HEAD
import Categories from "./pages/Categories"


=======
import AdminCategories from "./admin/AdminCategories"
>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029
// admin pages
import AdminLogin from "./admin/AdminLogin"
import AdminRegister from "./admin/AdminRegister"
import AdminDashboard from "./admin/AdminDashboard"
<<<<<<< HEAD
import AdminCategories from "./admin/AdminCategories"
=======
>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029
import AdminProducts from "./admin/AdminProducts"
import AdminOrders from "./admin/AdminOrders"
import AdminReviews from "./admin/AdminReviews"
import AdminInventory from "./admin/AdminInventory"

<<<<<<< HEAD
// 🔐 admin protection
import AdminProtectedRoute from "./admin/AdminProtectedRoute"

function App() {
  return (
    <Routes>
      {/* ================= USER ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      {/* ================= ADMIN PUBLIC ================= */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />

      {/* ================= ADMIN PROTECTED ================= */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/categories"
        element={
          <AdminProtectedRoute>
            <AdminCategories />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminProtectedRoute>
            <AdminProducts />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <AdminProtectedRoute>
            <AdminOrders />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/reviews"
        element={
          <AdminProtectedRoute>
            <AdminReviews />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/inventory"
        element={
          <AdminProtectedRoute>
            <AdminInventory />
          </AdminProtectedRoute>
        }
      />
=======
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
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/orders" element={<AdminOrders />} />

<Route path="/admin/reviews" element={<AdminReviews />} />

<Route path="/admin/inventory" element={<AdminInventory />} />

>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029
    </Routes>
  )
}

export default App
