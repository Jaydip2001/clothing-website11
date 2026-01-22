import { useState } from "react"
import axios from "axios"

function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      )

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

  }

  return (
    <div>
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
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
    </div>
  )
}

export default AdminLogin
