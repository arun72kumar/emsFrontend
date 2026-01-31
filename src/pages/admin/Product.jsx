import React, { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { X } from 'lucide-react';
import { toast } from "react-hot-toast"
import axios from "axios"
import Sidebar from '../Sidebar'

export default function Product() {
  const [addModal, setAddModal] = useState(false)
  const [editProduct, setEditProduct] = useState(false)
  const [error, setError] = useState()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [search, setSearch] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    supplier: ""
  })
  //handleEdit
    function handleEdit(product) {
        setFormData({
            name: product?.name,
            description: product?.description,
            price: product?.price,
            stock: product?.stock,
            category: product?.category?._id,
            supplier: product?.supplier?._id,

        })
        setEditProduct(product._id)
        setAddModal(true)
    }


  // get categories
  async function getCategories() {
    try {
      const { data } = await axios.get(`https://emsbackend-prfw.onrender.com/api/v1/category/all`)
      if (data?.success) {
        setCategories(data?.categories)
      }
    } catch (error) {

    }
  }

  // getsupplier
  async function getSuppliers() {
    try {
      const { data } = await axios.get(`https://emsbackend-prfw.onrender.com/api/v1/supplier/all`)
      setSuppliers(data?.suppliers)
    } catch (error) {
      console.log(error)
    }
  }


  // handleChange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (editProduct) {
      try {

        const { data } = await axios.put(`http://localhost:8000/api/v1/product/update/${editProduct}`,
          formData
        )
        if (data?.status) {
          toast.success(data?.message)
          setAddModal(false)
          // getProducts()

        }

      } catch (error) {
        console.log(error?.response?.data?.message)
      }
    }

    else {
      try {
        // console.log(formData)
        const { data } = await axios.post(`https://emsbackend-prfw.onrender.com/api/v1/product/add`, formData)
        // console.log(data)

        if (data?.success) {
          toast.success(data?.message)
          getProducts()
          setEditProduct(false)
          closeModal()
        }
      } catch (error) {
        setError(error.response.data.message)
      }
    }

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
    setEditProduct(null)
  }


  // getproducts
  async function getProducts() {
    try {
      const { data } = await axios.get(`https://emsbackend-prfw.onrender.com/api/v1/product/all`)
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategories()
    getSuppliers()
    getProducts()
  }, [])
  return (
    <>
      {
        addModal && (
          <div className='fixed top-0 left-0  w-full h-full bg-black/50 flex justify-center items-center'>
            <div className='bg-white p-4 relative rounded shadow-md w-1/3'>
              <h1 className='font-bold text-xl'> {editProduct ? "Edit Product" : "Add Product"} </h1>
              <span></span>
              <button className='absolute font-bold top-4 right-4 text-lg cursor-pointer'
                onClick={() => closeModal()}><X /></button>
              <form className='flex flex-col gap-4 mt-4' onSubmit={handleSubmit}>
                <input type="text" placeholder='Product name' className='border p-2 w-full rounded'
                  name="name"
                  value={formData.name}
                  onChange={handleChange}

                />
                <input type="text" placeholder='Product description' className='border p-2 w-full rounded'
                  name="description"
                  value={formData.description}
                  onChange={handleChange} />

                <input type="text" placeholder='Price' className='border p-2 w-full rounded'

                  name="price"
                  value={formData.price}
                  onChange={handleChange} />


                <input type="text" placeholder='Stock' className='border p-2 w-full rounded'
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange} />



                {
                  editProduct
                    ? <>
                      <select className='border p-2 mb-2 rounded' name='category'
                        value={formData.category}
                        onChange={handleChange}>
                        {
                          categories.map((category, i) => <option key={i} value={category?._id}>
                            {category?.name}
                          </option>)
                        }
                      </select>
                    </>

                    : <>
                      <select className='border p-2 mb-2 rounded' name='category'
                        onChange={handleChange}>
                        <option value="">Select Category</option>
                        {
                          categories.map((category, i) => <option key={i} value={category?._id}>
                            {category?.name}
                          </option>)
                        }
                      </select>

                    </>


                }

                {
                  editProduct
                    ? <>
                      <select className='border p-2 mb-2 rounded' name='supplier' onChange={handleChange}>
                        {
                          suppliers.map((supplier, i) => <option key={i} value={supplier?._id}>
                            {supplier?.name}
                          </option>)
                        }
                      </select>
                    </>
                    : <>
                      <select className='border p-2 mb-2 rounded' name='supplier' onChange={handleChange}>
                        <option value="">Select Supplier</option>
                        {
                          suppliers.map((supplier, i) => <option key={i} value={supplier?._id}>
                            {supplier?.name}
                          </option>)
                        }
                      </select>
                    </>
                }

                {editProduct ?
                  <div className='flex space-x-1'>
                    <button className='bg-green-600 text-white p-2 w-full rounded-md
                             cursor-pointer hover:bg-green-700
                            '
                    > Save</button>
                    <button className='bg-red-600 text-white p-2 w-full rounded-md
                             cursor-pointer hover:bg-red-700
                             '
                      onClick={() => closeModal()}
                    > Cancel</button>
                  </div>
                  : <button className='bg-green-600 text-white p-2 w-full rounded-md
                             cursor-pointer hover:bg-green-700
                            '> Add Product</button>}
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
              Product Management
            </h1>
            <div className='flex justify-between items-center' >
              <div className="relative w-[20%] mb-2 bg-white ">
                {/* <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /> */}

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
                  Add Product
                </button>
              </div>
            </div>
            <div className='bg-white p-3 rounded-md mt-2'>
              <table className='w-full border border-gray-200 border-collapse  bg-white p-10 '>
                <thead>
                  <tr>
                    <th className='border bg-gray-200 p-1'>Name</th>
                    <th className='border bg-gray-200 p-1'>Category</th>
                    <th className='border bg-gray-200 p-1'>Supplier</th>
                    <th className='border bg-gray-200 p-1'>Price</th>
                    <th className='border bg-gray-200 p-1'>Stock</th>
                    <th className='border bg-gray-200 p-1'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.length > 0
                      ? products.map((product, i) => <tr key={i}>
                        <td className='border  border-gray-200  p-1'>{product?.name}</td>
                        <td className='border  border-gray-200 p-1'>{product?.category?.name}</td>
                        <td className='border  border-gray-200 p-1'>{product?.supplier?.name}</td>
                        <td className='border  border-gray-200 p-1'>{product?.price}</td>
                        <td className='border  border-gray-200 p-1'>
                          <span className='font-semibold'>
                            {
                              product?.stock === 0
                                ? <span className='bg-red-100 text-red-500'>{product?.stock}</span>
                                : product?.stock < 5
                                  ? <span className='bg-yellow-100 text-yellow-500 p-1 rounded-full'>{product?.stock}</span>
                                  : <span className='bg-green-100 text-green-500'>{product?.stock}</span>

                            }
                          </span>


                        </td>
                         <td className='md:space-x-2 space-y-1 border flex   border-gray-200 p-2'>
                                                        <button className='bg-green-600 w-15 md:w-20 px-2 py-1 font-semibold text-white rounded hover:bg-green-700 hover:cursor-pointer'
                                                            onClick={() => {
                                                                handleEdit(product)
                                                            }}


                                                        >Edit</button>

                                                        <button className='bg-red-600 w-15 md:w-20 hover:bg-red-700 px-2 py-1 font-semibold text-white rounded hover:cursor-pointer'
                                                            onClick={() => {
                                                                if (window.confirm("Are you sure to delete?")) {
                                                                    handleDelete(product?._id)
                                                                }
                                                            }}
                                                        >Delete</button>
                                                        <button></button>
                                                    </td>
                      </tr>

                      )
                      : ""
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
