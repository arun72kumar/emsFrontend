import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { FiSearch } from "react-icons/fi";
import { X } from 'lucide-react';
import axios from 'axios';
import { toast } from "react-hot-toast"


export default function Supplier() {
    const [error, setError] = useState("")
    const [addModal, setAddModal] = useState(false)
    const [suppliers, setSuppliers] = useState([])
    const [editSupplier, setEditSupplier] = useState(false)
    const [search,setSearch]=useState("")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })

        // filterRecords
    const filterData = suppliers.filter((supplier) => {
        const searchableContent = `${supplier.name} ${supplier.email} ${supplier.address}`
        return searchableContent.toLowerCase().includes(search.toLowerCase())
    })

    //handleEdit
    function handleEdit(supplier) {
        setFormData({
            name: supplier?.name,
            email: supplier?.email,
            phone: supplier?.phone,
            address: supplier?.address
        })
        setEditSupplier(supplier._id)
        setAddModal(true)
    }


    //handlechange 
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    // closemodal
    function closeModal() {
        setAddModal(false)
        setFormData({
            name: "",
            email: "",
            phone: "",
            address: ""
        })
        setEditSupplier(null)
    }

    //    // HANDLEDELETE
    async function handleDelete(id) {
        console.log(id)
        try {
            const { data } = await axios.delete(`http://localhost:8000/api/v1/supplier/delete/${id}`)

            if (data?.success) {
                toast.success("Supplier deleted successfully!")
                getSuppliers()
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    }



    // HANDLE SUBMIT
    async function handleSubmit(e) {
        e.preventDefault()
        if (editSupplier) {
            try {
                console.log(editSupplier)
                const { data } = await axios.put(`http://localhost:8000/api/v1/supplier/update/${editSupplier}`,
                    formData
                )
                console.log(data)
                if (data?.status) {
                    toast.success(data?.message)
                    setAddModal(false)
                    getSuppliers()

                }
            } catch (error) {
                console.log(error?.response?.data?.message)
            }
        }
        else {
            try {
                const { data } = await axios.post(`http://localhost:8000/api/v1/supplier/add`, formData)
                if (data?.success) {
                    console.log("ok")
                    toast.success(data?.message)
                    setFormData({ name: '', email: '', phone: '', address: '' })
                    getSuppliers()
                    setEditSupplier(false)
                }
            } catch (error) {
                setError(error.response.data.message)
            }
        }

    }

    async function getSuppliers() {
        try {
            const { data } = await axios.get(`https://emsbackend-prfw.onrender.com/api/v1/supplier/all`)
            setSuppliers(data?.suppliers)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSuppliers()
    }, [])

    return (
        <>
            {
                addModal && (
                    <div className='fixed top-0 left-0  w-full h-full bg-black/50 flex justify-center items-center'>
                        <div className='bg-white p-4 relative rounded shadow-md w-1/3'>
                            <h1 className='font-bold text-xl'> {editSupplier ? "Edit Supplier" : "Add Supplier"} </h1>
                            <span></span>
                            <button className='absolute font-bold top-4 right-4 text-lg cursor-pointer'
                                onClick={() => closeModal()}
                            ><X /></button>
                            <form className='flex flex-col gap-4 mt-4' onSubmit={handleSubmit} >
                                <input type="text" placeholder='Supplier name' className='border p-2 w-full rounded'
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}

                                />
                                <input type="email" placeholder='Supplier email' className='border p-2 w-full rounded'
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <input type="text" placeholder='Supplier phone' className='border p-2 w-full rounded'

                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                <input type="text" placeholder='Supplier address' className='border p-2 w-full rounded'
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                                {editSupplier ?
                                    <div className='flex space-x-1'>
                                        <button className='bg-green-600 text-white p-2 w-full rounded-md
                             cursor-pointer hover:bg-green-700
                            '
                                        > Save</button>
                                        <button className='bg-red-600 text-white p-2 w-full rounded-md
                             cursor-pointer hover:bg-red-700
                             '
                                            onClick={closeModal}
                                        > Cancel</button>
                                    </div>
                                    : <button className='bg-green-600 text-white p-2 w-full rounded-md
                             cursor-pointer hover:bg-green-700
                            '> Add Supplier</button>}


                            </form>
                        </div>
                    </div>
                )
            }




            <div className='flex'>
                <Sidebar />
                <div className='p-4 bg-gray-100 w-screen '>
                    <div className='w-full h-full flex flex-col'>
                        <h1 className='text-2xl text-center md:text-left font-bold mb-5 font-sans'>
                            Supplier Management
                        </h1>
                        <div className='flex justify-between items-center' >
                            <div className="relative w-[20%] mb-2 bg-white ">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    placeholder='Type here to search'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded border border-gray-300 py-2 pl-10 pr-3 text-sm
                                                                focus:outline-none "
                                />
                            </div>
                           <div className='p-1 bg-white'>
                             <button className='bg-amber-700 text-white px-4 py-1 hover:bg-amber-800 hover:cursor-pointer rounded'
                                onClick={() => setAddModal(true)}
                            >
                                Add Supplier
                            </button>
                           </div>
                        </div>
                        <div className='bg-white p-3 rounded-md mt-2'>
                            <table className='w-full border border-gray-200 border-collapse  bg-white p-10 '>
                                <thead>
                                    <tr className='text-left'>
                                        <th className='border bg-gray-200 p-1'>Name</th>
                                        <th className='border bg-gray-200 p-1'>Email</th>
                                        <th className='border bg-gray-200 p-1'>Phone</th>
                                        <th className='border bg-gray-200 p-1'>Address</th>
                                        <th className='border bg-gray-200 p-1'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterData && filterData.length > 0
                                            ? <>
                                                {filterData.map((supplier, i) => <tr key={i}>
                                                    <td className='border  border-gray-200 capitalize p-1'>{supplier?.name}</td>
                                                    <td className='border  border-gray-200 p-1'>{supplier?.email}</td>
                                                    <td className='border  border-gray-200 p-1'>{supplier?.phone}</td>
                                                    <td className='border  border-gray-200 capitalize p-1'>{supplier?.address}</td>
                                                    <td className='md:space-x-2 space-y-1 border flex   border-gray-200 p-2'>
                                                        <button className='bg-green-600 w-15 md:w-20 px-2 py-1 font-semibold text-white rounded hover:bg-green-700 hover:cursor-pointer'
                                                            onClick={() => {
                                                                handleEdit(supplier)
                                                            }}


                                                        >Edit</button>

                                                        <button className='bg-red-600 w-15 md:w-20 hover:bg-red-700 px-2 py-1 font-semibold text-white rounded hover:cursor-pointer'
                                                            onClick={() => {
                                                                if (window.confirm("Are you sure to delete?")) {
                                                                    handleDelete(supplier?._id)
                                                                }
                                                            }}
                                                        >Delete</button>
                                                        <button></button>
                                                    </td>
                                                </tr>)}
                                            </>
                                            : <>
                                                <tr>
                                                    <td colSpan={'5'} className=' text-center p-4  text-2xl'>
                                                        No Supplier found</td>
                                                </tr>
                                            </>
                                    }
                                </tbody>

                            </table>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}
