import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FiSearch } from "react-icons/fi";

export default function Category() {
    const [categories, setCategories] = useState([])
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [description, setDescription] = useState("")
    const [search, setSearch] = useState("")
    const [edit, setEdit] = useState(false)
    // filterCategory
    const filterCategory = categories.filter((cat) => {
        return cat?.name.toLowerCase().includes(search.toLowerCase())
    })
    console.log(filterCategory)

    // handleCancel
    function handleCancel() {
        setEdit(false)
        setName("")
        setDescription("")
    }
    // handleEdit
    function handleEdit(cat) {
        setEdit(true)
        setId(cat?._id)
        setName(cat?.name)
        setDescription(cat?.description)
    }
    // handleDelete
    async function handleDelete(_id) {
        try {
            const { data } = await axios.delete(`https://emsbackend-prfw.onrender.com/api/v1/category/delete/${_id}`)
            if (data?.success) {
                toast.success(data?.message)
                getCategories()
            }
        } catch (error) {
            console.log(error)
        }
    }
    // handlesubmit
    async function handleSubmit(e) {
        e.preventDefault()
        if (edit) {
            console.log(id)
            try {
                const { data } = await axios.put(`/ims/api/v1/category/update/${id}`, {
                    name, description
                })

                if (data?.success) {
                    toast.success(data.message)
                    getCategories()
                }
            }
            catch {
                console.log(error)
            }
        }
        else {
            try {
                const { data } = await axios.post(`/ims/api/v1/category/add`, {
                    name, description
                })

                console.log(data)
                if (data?.success) {
                    setName("")
                    setDescription("")
                    toast.success(data.message)
                    getCategories()
                }
            }
            catch {
                console.log(error)
            }
        }
    }
    // get categories
    async function getCategories() {
        try {
            const { data } = await axios.get(`/ims/api/v1/category/all`)
            if (data?.success) {
                setCategories(data?.categories)
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        getCategories()
    }, [])
    return (
        <>
            <div className='flex'>
                <Sidebar />
                <div className='p-4  bg-gray-100 w-screen'>
                    <div className='flex  flex-col'>
                        <h1 className='text-2xl text-center md:text-left font-bold mb-5 font-sans'>
                            Category Management</h1>
                    </div>
                    <div className='flex flex-col md:flex-row space-y-2'>
                        <div className='md:w-1/3'>

                            <div className='flex flex-col lg:flex-row gap-4'>
                                <div className='bg-white shadow-md rounded-lg  p-4 md:w-[90%]  w-full'>

                                    <h2 className='text-center text-2xl font-bold mb-4'>
                                        {edit ? "Edit Category" : "Add Category"}

                                    </h2>
                                    {/* <span style={{ color: "red", fontWeight: "bold", padding: "5px 0px", }}>{error}</span> */}

                                    <form className='space-y-2' >
                                        <div>
                                            <input
                                                type="text"
                                                placeholder='Category name'
                                                className='border w-full p-2 rounded-md'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />

                                        </div>
                                        <div>
                                            <textarea
                                                type="text"
                                                placeholder='Category description'
                                                className='border w-full p-2 rounded-md'
                                                rows={4}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div>


                                            {edit
                                                ?
                                                <div className='flex space-x-1'>
                                                    <button className='bg-green-600 text-white p-2 w-full rounded-md
                             cursor-pointer hover:bg-green-700
                            '
                                                        onClick={handleSubmit}

                                                    > Save</button>
                                                    <button className='bg-red-600 text-white p-2 w-full rounded-md
                             cursor-pointer hover:bg-red-700
                             '                       onClick={handleCancel}
                                                    > Cancel</button>
                                                </div>
                                                : <button className='bg-green-600 text-white p-2 w-full rounded-md
                             cursor-pointer hover:bg-green-700
                            '
                                                    onClick={handleSubmit}
                                                > Submit</button>}

                                        </div>


                                    </form>
                                </div>


                            </div>
                        </div>
                        <div className='md:w-2/3'>
                            <div className='bg-white p-4 rounded-md'>
                                {/* table */}
                                <div className="relative w-full mb-2 ">
                                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="text"
                                        placeholder='Search by category'
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                         className="w-full rounded border border-gray-300 py-2 pl-10 pr-3 text-sm
                                         focus:outline-none "
                                    />
                                </div>

                                <table className='w-full border-collapse  text-left '>
                                    <thead>
                                        <tr>
                                            <th className='border  bg-gray-200 p-2'>Category Name</th>
                                            <th className='border  bg-gray-200 p-2'>Description</th>
                                            <th className='border  bg-gray-200 p-2'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterCategory.map((cat, i) => <tr key={i}>
                                                <td className='border border-gray-200 p-2 capitalize'>{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}</td>
                                                <td className='border border-gray-200 p-2 capitalize'>
                                                    {cat.description}</td>
                                                <td className='md:space-x-2 space-y-1 space-x-1 border flex   border-gray-200 p-2'>
                                                    <button className='bg-green-600 w-15 md:w-20 px-2 py-1 font-semibold text-white rounded hover:bg-green-700 hover:cursor-pointer'
                                                        onClick={() => handleEdit(cat)}
                                                    >Edit</button>

                                                    <button className='bg-red-600 w-15 md:w-20 hover:bg-red-700 px-2 py-1 font-semibold text-white rounded hover:cursor-pointer'
                                                        onClick={() => {
                                                            if (window.confirm("Are you sure to delete?")) {
                                                                handleDelete(cat?._id)
                                                            }
                                                        }}
                                                    >Delete</button>
                                                    <button></button>

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
