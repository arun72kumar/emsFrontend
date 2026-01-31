import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import { useAuth } from '../../context/auth'

export default function () {
  const  {auth}  = useAuth()
  const [profile, setProfile] = useState(auth.user)

  const [edit, setEdit] = useState(false)

  // HANDLE EDIT
  function handleEdit(){
    setEdit(true)
  }


    return (
        <>
            <div className='flex'>
                <Sidebar />
                <div className='p-4 w-screen'>
                    <div className='flex flex-col md:flex-row space-y-2'>
                        <div className='md:w-1/3'>
                            <div className='flex flex-col lg:flex-row gap-4'>
                                <div className='bg-white shadow-md rounded-lg  p-4 md:w-[90%] '>
                                    <h1 className='text-2xl text-center md:text-left font-bold mb-5 font-sans'>
                                        User Profile
                                    </h1>
                                    <form className='space-y-2 w-full'>
                                        <div>
                                            <label htmlFor="" className='font-semibold'>Name</label>
                                            <input
                                                type="text"
                                                className='border w-full p-2 rounded-md'
                                                name="name"
                                                disabled={!edit}
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}

                                            />

                                        </div>
                                        <div>
                                            <label htmlFor="" className='font-semibold'>Email</label>
                                            <input
                                                type="email"
                                                className='border w-full p-2 rounded-md'
                                                disabled={!edit}
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}

                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='font-semibold'>Address</label>
                                            <input
                                                type="text"
                                                className='border w-full p-2 rounded-md'
                                                disabled={!edit}
                                                value={profile.address}
                                                onChange={(e) => setProfile({ ...profile, address: e.target.value })}

                                            />
                                        </div>

                                        {
                                            edit && <div>
                                                <label htmlFor="" className='font-semibold'>Password</label>
                                                <input
                                                    type="password"
                                                    className='border w-full p-2 rounded-md'
                                                    placeholder='Password'
                                                    value={profile.password}
                                                    onChange={(e) => setProfile({ ...profile, password: e.target.value })}

                                                />
                                            </div>
                                        }

                                        <div className='flex space-x-1 mt-4'>

                                            {
                                                edit
                                                    ? <div className='flex space-x-1'>
                                                        <button className='bg-green-600 text-white p-2 w-full rounded-md
                             cursor-pointer hover:bg-green-700
                            '
                                                            // onClick={handleUpdate}
                                                        > Save</button>
                                                        <button className='bg-red-600 text-white p-2  w-full rounded-md
                             cursor-pointer hover:bg-red-700
                             '
                                                        > Cancel</button>
                                                    </div>
                                                    : <button className='bg-amber-700 text-white p-2 px-4  rounded-md
                             cursor-pointer hover:bg-amber-800
                            '
                                                        onClick={() => handleEdit()}
                                                    > Edit Profile</button>

                                            }
                                            </div>

                             




                                    </form>
                                </div>


                            </div>
                        </div>
                        <div className='md:w-2/3'>
                            <div className='bg-white p-4 rounded-md'>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
