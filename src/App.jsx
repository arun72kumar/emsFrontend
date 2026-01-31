
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './auth/Login'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/admin/Dashboard'
import { CustomerProfile} from './pages/customer/CustomerProfile'
import AdminProtected from './protected/AdminProtected'
import UserProtected from './protected/UserProtected'
import AdminLogout from './pages/admin/AdminLogout'
import CustomerLogout from './pages/customer/CustomerLogout'
import Category from './pages/admin/Category'
import Supplier from './pages/admin/Supplier'
import Product from './pages/admin/Product'
import Users from './pages/admin/Users'
import Profile from './pages/admin/Profile'
import { CustomerProducts } from './pages/customer/CustomerProducts'
import { CustomerOrders } from './pages/customer/CustomerOrders'


function App() {

   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route path='/' element={<Login />} />
               {/* admin protected routes */}
               <Route path='/admin/' element={<AdminProtected />}>
                  <Route path='dashboard' element={<Dashboard />} />
                  <Route path='categories' element={<Category />} />
                  <Route path='suppliers' element={<Supplier />} />
                  <Route path='products' element={<Product />} />
                  <Route path='users' element={<Users/>} />
                  <Route path='profile' element={<Profile/>} />
                  <Route path='logout' element={<AdminLogout />} />
               </Route>

               {/* customer protected routes */}
               <Route path='/customer/' element={<UserProtected />}>
                  <Route path='profile' element={<CustomerProfile />} />
                  <Route path='orders' element={<CustomerOrders />} />
                  <Route path='products' element={<CustomerProducts />} />
                  <Route path='logout' element={<CustomerLogout />} />
               </Route>
            </Routes>
         </BrowserRouter>
         <Toaster />
      </>
   )
}

export default App
