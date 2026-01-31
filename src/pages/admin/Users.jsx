import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'
import toast from 'react-hot-toast'

function Users() {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState()
    const [address, setAddress] = useState()
    const [role, setRole] = useState(false)
    const [error, setError] = useState()
    const [users, setUsers] = useState([])

    // ADD HANDLE SUBMIT 
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`/ims/api/v1/user/add`, {
                name, email, password, address, role
            })
            console.log(data)
            if (data.success) {
                toast.success(data.message)
                getAllUsers()
            }

        } catch (error) {
            setError(error?.response?.data?.message)
        }

    }


    // delete User
    async function handleDelete(id) {
        try {
            const { data } = await axios.delete(`/ims/api/v1/user/delete/${id}`)
            if (data.status) {
                toast.success(data?.message)
                getAllUsers()
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    }



    // GET ALL USERS
    async function getAllUsers() {
        try {
            const { data } = await axios.get(`/ims/api/v1/user/all`)
            // console.log(data)
            if (data.success) {
                setUsers(data?.users)
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <>
            <div className='flex'>
                <Sidebar />
                <div className='p-4  bg-gray-100 w-screen'>
                    <div className='flex  flex-col'>
                        <h1 className='text-2xl text-center md:text-left font-bold mb-5 font-sans'>
                            User Management</h1>
                    </div>
                    <div className='flex flex-col md:flex-row space-y-2'>
                        <div className='md:w-1/3'>

                            <div className='flex flex-col lg:flex-row gap-4'>
                                <div className='bg-white shadow-md rounded-lg  p-4 md:w-[90%]  w-full'>

                                    <h2 className='text-center text-2xl font-bold mb-4'>
                                        Add New User
                                    </h2>
                                    <span style={{ color: "red", fontWeight: "bold", padding: "5px 0px", }}>{error}</span>

                                    <form className='space-y-2' onSubmit={handleSubmit}>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder='name'
                                                className='border w-full p-2 rounded-md'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />

                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                placeholder='email'
                                                className='border w-full p-2 rounded-md'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="password"
                                                placeholder='password'
                                                className='border w-full p-2 rounded-md'
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder='address'
                                                className='border w-full p-2 rounded-md'
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>

                                        <select className='border p-2 mb-2 rounded w-full' name='role'
                                            onChange={(e) => setRole(e.target.value)}>
                                            <option value="">Select Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="customer">Customer</option>


                                        </select>

                                        <button className='bg-gray-600 text-white p-2 w-full rounded-md
                             cursor-pointer hover:bg-gray-700
                            '> Add User</button>

                                    </form>
                                </div>


                            </div>
                        </div>
                        <div className='md:w-2/3'>
                            <div className='bg-white p-4 rounded-md'>
                                {/* table */}
                                <table className='w-full border-collapse border border-gray-200 '>
                                    <thead>
                                        <tr className='border-gray-100'>
                                            <th className='border  bg-gray-200 p-2'>Name</th>
                                            <th className='border  bg-gray-200 p-2'>Email</th>
                                            <th className='border  bg-gray-200 p-2'>Address</th>
                                            <th className='border  bg-gray-200 p-2'>Role</th>
                                            <th className='border  bg-gray-200 p-2'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map((u) =>
                                                <tr key={u?.id}>
                                                    <td className='border capitalize border-gray-200 p-2'>{u.name}</td>
                                                    <td className='border border-gray-200 p-2'>{u.email}</td>
                                                    <td className='border capitalize border-gray-200 p-2'>{u.address}</td>
                                                    <td className='border capitalize border-gray-200 p-2'>{u.role}</td>
                                                    <td className='md:space-x-2 space-y-1 border flex   border-gray-200 p-2'>
                                                        <td>
                                                            <button className=' bg-rose-600 hover:bg-rose-700 text-white
                                            hover:cursor-pointer px-3 rounded-2xl py-1 font-semibold '
                                                                onClick={() => {
                                                                    if (window.confirm("Are you sure to delete?")) {
                                                                        handleDelete(u._id)
                                                                    }
                                                                }}

                                                            >Delete</button>
                                                        </td>

                                                    </td>
                                                </tr>)
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users