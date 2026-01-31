import React from 'react'
import Sidebar from '../Sidebar'

export default function Dashboard() {
  return (
    <>
        <div className='flex'>
           <Sidebar/>
           <div>
              admin dashboard
           </div>
        </div>
    </>
  )
}
