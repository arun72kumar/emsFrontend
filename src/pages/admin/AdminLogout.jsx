import React, { useEffect } from 'react'
import { useAuth } from '../../context/auth'
import { useNavigate } from 'react-router-dom'

export default function AdminLogout() {
     const {setAuth} =   useAuth()
      const navigate = useNavigate()
      function logout()
      {
            localStorage.clear()
            setAuth(null)
            navigate("/")

      }
      useEffect(()=>{
           logout()
      },[])
}
