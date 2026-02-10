import { useState } from "react"
import axios from "axios"
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom"
=======
>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029

function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
<<<<<<< HEAD
  const navigate = useNavigate()
=======
>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      )

<<<<<<< HEAD
      // ✅ SAVE ADMIN SESSION
      localStorage.setItem("admin", JSON.stringify(res.data.admin))

      alert("Login successful")
      navigate("/admin")
    } catch {
      alert("Invalid admin credentials")
    }
=======
      alert(res.data.message)
      console.log(res.data.admin)
    //   if you got error in err  used this code 
//     catch {
//   alert("Invalid admin credentials")
// }

    } catch (err) {
  console.error(err.response?.data || err.message)
  alert("Invalid admin credentials")
}

>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029
  }

  return (
    <div>
<<<<<<< HEAD
      <h1>Admin Login</h1>

      <form onSubmit={handleLogin}>
        <input
=======
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Login</button>
      </form>
<<<<<<< HEAD

      <br />

      {/* ✅ REGISTER LINK */}
      <p>
        New Admin?{" "}
        <Link
          to="/admin/register"
          style={{
            padding: "6px 12px",
            border: "1px solid black",
            textDecoration: "none",
            marginLeft: "5px"
          }}
        >
          Register
        </Link>
      </p>
=======
>>>>>>> fea072c0faff7e3482e200dfc9d6a834a3f26029
    </div>
  )
}

export default AdminLogin
