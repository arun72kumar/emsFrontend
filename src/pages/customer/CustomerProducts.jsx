import axios from 'axios'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react';
import toast from "react-hot-toast"
import Sidebar from '../Sidebar';

export function CustomerProducts() {
    const [categories, setCategories] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [error, setError] = useState()



    const [orderData, setOrderData] = useState(
        {
            productId: "", quantity: 1, total: 0, stock: 0, price: 0
        }
    )

    // handlesave
    const handleSave = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`http://localhost:8000/api/v1/order/add`, orderData)
            if (data.success) {
                toast.success(data.message)
                setOpenModal(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // handleorderchange
    const handleOrderChange = (product) => {

        setOrderData({
            productId: product._id,
            quantity: 1,
            total: product.price,
            stock: product.stock,
            price: product.price
        })

        setOpenModal(true)
    }



    // Filtered products
    const filterProducts = selectedCategory
        ? products.filter(
            (product) => product?.category?._id === selectedCategory
        )
        : products


    // Get products
    async function getProducts() {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/product/all`)
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    // getcategories
    async function getCategories() {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/category/all`)
            if (data.success) {
                setCategories(data?.categories)
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getCategories()
        getProducts()
    }, [])


    return (
        <>
            <div className='flex'>
                <Sidebar />
                <div className='p-4 w-screen  '>
                    <div className='w-full  flex flex-col'>
                        <h1 className='text-2xl text-center md:text-left font-bold mb-5 font-sans'>
                            Product Management
                        </h1>
                        <div className='flex justify-between items-center' >
                            <select className='w-50  p-2 bg-white rounded' 
                            onChange={(e)=>setSelectedCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                <option value="">All</option>


                                {
                                    categories.map((cat) => <option key={cat?._id} value={cat?._id}>
                                        {cat?.name}
                                    </option>)
                                }
                            </select>

                        </div>
                    </div>
                    <div className='bg-white p-3 rounded-md mt-2'>
                        <table className='w-full border border-gray-200 border-collapse  bg-white p-10 '>
                            <thead>
                                <tr>
                                    <th className='border bg-gray-200 p-1'>Sno </th>
                                    <th className='border bg-gray-200 p-1'>Name</th>
                                    <th className='border bg-gray-200 p-1'>Category</th>
                                    <th className='border bg-gray-200 p-1'>Price</th>
                                    <th className='border bg-gray-200 p-1'>Stock</th>
                                    <th className='border bg-gray-200 p-1'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterProducts.length > 0
                                        ? <>{
                                            filterProducts.map((product, i) => <tr key={i}>
                                                <td className='border  border-gray-200  p-1'>{++i}</td>
                                                <td className='border  border-gray-200  p-1'>{product?.name}</td>
                                                <td className='border  border-gray-200  p-1'>{product?.category?.name}</td>
                                                <td className='border  border-gray-200  p-1'>{product?.price}</td>
                                                <td className='border  border-gray-200  p-1'>{product?.stock}</td>
                                                <td className='border  border-gray-200  p-1'>
                                                    <button className='bg-green-600 px-5 py-1 hover:cursor-pointer hover:bg-green-700
                            text-white rounded-2xl'
                                                        onClick={() => handleOrderChange(product)}
                                                    >Order</button>
                                                </td>
                                            </tr>)
                                        }</>
                                        : <>{
                                            <tr>
                                                <td colSpan="6" className="text-center p-3">
                                                    No products found
                                                </td>
                                            </tr>
                                        }</>
                                }
                            </tbody>

                        </table>
                    </div>


                    {
                        openModal
                        && <div className='fixed top-0 left-0  w-full h-full bg-black/50 flex justify-center items-center'>
                            <div className='bg-white p-4 relative rounded shadow-md w-1/3'>
                                <h1 className='font-bold text-xl'> Place order </h1>
                                <span></span>
                                <button className='absolute font-bold top-4 right-4 text-lg cursor-pointer'
                                    onClick={() => setOpenModal(false)}><X /></button>
                                <form className='flex flex-col gap-4 mt-4'>
                                    <input type="number" className='border p-2 w-full rounded'
                                        value={orderData.quantity}
                                        name="quantity"
                                        onChange={(e) => setOrderData({ ...orderData, [e.target.name]: e.target.value })}

                                    />
                                    <p className='font-bold'>Total : {orderData.quantity * orderData.price}</p>

                                    <div className='flex space-x-1'>
                                        <button className='bg-green-600 text-white p-2 w-full rounded-md
                             cursor-pointer hover:bg-green-700
                            '
                                            onClick={handleSave}
                                        > Save</button>
                                        <button className='bg-red-600 text-white p-2 w-full rounded-md
                             cursor-pointer hover:bg-red-700
                             '

                                        > Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }




                </div>


            </div>
        </>
    )
}
