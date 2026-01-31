import React, { useEffect, useState } from 'react'
import { FaHome, FaTable, FaBox, FaUsers, FaCog, FaShoppingCart, FaSignOutAlt, 
    FaTruck } from "react-icons/fa"
import { NavLink } from 'react-router-dom'
import { useAuth } from "../context/auth"

export default function Sidebar() {
    const menuItems = [
        { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome />,isParent:true },
        { name: "Categories", path: "/admin/categories", icon: <FaTable />,isParent:false },
        { name: "Products", path: "/admin/products", icon: <FaBox />,isParent:false  },
        { name: "Suppliers", path: "/admin/suppliers", icon: <FaTruck />,isParent:false },
        { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart />,isParent:false },
        { name: "Users", path: "/admin/users", icon: <FaUsers />,isParent:false },
        { name: "Profile", path: "/admin/profile", icon: <FaCog />,isParent:false },
        { name: "Logout", path: "/admin/logout", icon: <FaSignOutAlt />,isParent:false },
    ]

    const customerItems = [
        { name: "Products", path: "/customer/products", icon: <FaBox />,isParent:false  },
        { name: "Orders", path: "/customer/orders", icon: <FaShoppingCart />,isParent:false },
        { name: "Profile", path: "/customer/profile", icon: <FaCog />,isParent:false },
        { name: "Logout", path: "/customer/logout", icon: <FaSignOutAlt />,isParent:false },
    ]
    const {auth} = useAuth()
    const [menuLinks,setMenuLinks] = useState(customerItems)

    useEffect(()=>{
        if(auth?.user && auth?.user?.role == "admin")
        {
            setMenuLinks(menuItems)
        }
    },[])

    return (
        <>
            <div className='flex flex-col h-screen bg-black text-white w-16 md:w-65'>
                <div className='h-16 flex justify-center items-center'>
                        <span className='hidden md:block text-xl font-bold'>Inventory MS</span>
                        <span className='md:hidden text-xl font-bold'>IMS</span>
                </div>

                <div>
                    <ul className='space-y-2 p-2'>
                        {menuLinks.map((item, i) => <li key={i}>
                            <NavLink to={item.path}
                            end={item.isParent}
                            className ={({ isActive }) => `${isActive ? 'bg-gray-500' : ""} flex items-center space-x-4  py-2.5 px-4 mb-2 rounded  hover:bg-white hover:text-gray-800 transition duration-200` }
                            // className="flex items-center p-2 rounded"
                            >

                            <span className='text-xl'> {item.icon}</span>
                            <span className='text-xl px-2'>{item.name}</span>
                        </NavLink>
                        </li>
                        )}
                    </ul>

                </div>

            </div>
        </>
    )
}
