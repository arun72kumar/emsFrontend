import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'

export const CustomerOrders = () => {
    const [orders, setOrders] = useState([])
    async function getOrders() {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/order/all`)
            if (data?.success) {
                setOrders(data?.orders)

            }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div>
            <div className='flex'>
                <Sidebar />

                <div className='p-4 w-screen  '>
                    <div className='flex flex-col'>
                        <h1 className='text-2xl text-center md:text-left font-bold mb-5 font-sans'>
                            Order Management
                        </h1>
                        <div className='flex justify-between items-center' >
                            <input type="text" placeholder='Search' className='border p-2 bg-white rounded'
                            />
                        </div>
                    </div>
                    <div className='bg-white p-3 rounded-md mt-2'>
                        <table className='w-full border border-gray-200 border-collapse  bg-white p-10 '>
                            <thead>
                                <tr>
                                    <th className='border bg-gray-200 p-1'>Sno </th>
                                    <th className='border bg-gray-200 p-1'>Name</th>
                                    <th className='border bg-gray-200 p-1'>Quantity</th>
                                    <th className='border bg-gray-200 p-1'>TotalPrice</th>
                                    <th className='border bg-gray-200 p-1'>Date</th>
                                </tr>
                            </thead>

                            {
                                orders.map((order, i) => <tr key={i}>
                                    <td className='border  p-1'>{i + 1} </td>
                                    <td className='border  p-1'>{order?.product?.name}</td>
                                    <td className='border  p-1'>{order?.quantity}</td>
                                    <td className='border  p-1'>{order?.totalPrice}</td>
                                    <td className='border  p-1'>{new Date(order?.orderDate)
                                    .toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}</td>
                                </tr>)
                            }


                        </table>


                    </div>



                </div>
            </div>
        </div>
    )
}
