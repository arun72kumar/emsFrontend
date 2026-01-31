import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import Login from '../auth/Login'
import { Outlet } from 'react-router-dom'

function UserProtected() {

    const [ok, setOk] = useState(false)
    const {auth,setAuth} = useAuth()
    useEffect(() => {
        async function authCheck() {
            const { data } = await axios.get(`http://localhost:8000/api/v1/user/user-protected`,
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                })
            console.log(data)
            if (data?.ok) {
                setOk(data?.ok)
            }
            else {
                setOk(false)
            }
        }
        if (auth?.token) authCheck()
    }, [auth?.token])
    return (
        <div>
            {ok ? <Outlet /> : <Login />}
        </div>
    )
}

export default UserProtected