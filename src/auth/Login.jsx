import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuth();
  const navigate = useNavigate()

  // HANDLE LOGIN
  async function handleLogin(e) {
    e.preventDefault()
    try {

      const { data } = await axios.post(`https://emsbackend-prfw.onrender.com/api/v1/user/login`, {
        email: email,
        password: password
      })
      if (data?.success) {
          const authData = {
            user: data.user,
            token: data.token,
          };

          localStorage.setItem("auth", JSON.stringify(authData));
          setAuth(authData); //triggers re-render
          toast.success(data?.message)
          navigate(
            data.user.role === "admin"
              ? "/admin/dashboard"
              : "/customer/profile",
            { replace: true }
          );
        
      }
    } catch (error) {
      setError(error?.response?.data?.message)
    }
  }


  return (
    <div
      className="bg-linear-to-b from-teal-600 from-50% to-gray-200 to-50% space-y-6
    flex flex-col items-center justify-center h-screen
    "
    >
      <h1 className="text-[40px] text-white  font-inventory  ">
        Inventory Management System
      </h1>
      <div className="shadow rounded shadow-gray-300 p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <span style={{ color: "red", fontWeight: "bold", padding: "5px 0px" }}>{error}</span>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-3 py-1 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
          </div>
          <div className="mb-4">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-3 py-1 border rounded"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}


            />
          </div>
          <button className="w-full rounded bg-teal-600 hover:bg-teal-700
           text-white py-2 cursor-pointer"
          >Login</button>

        </form>
      </div>
    </div>
  )
}
