


import { Route, Routes } from 'react-router-dom'
import './App.css'

import RequireAuth from './Constants/Auth/RequireAuth'
import AboutUs from './Pages/AboutUs'
import Contact from './Pages/Contact'
import CourseDescription from './Pages/Course/CourseDescription'
import CourseList from './Pages/Course/CourseList'
import CreateCourse from './Pages/Course/CraeteCourse'
import Denied from './Pages/DeniedPage'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import NotFound from './Pages/NotFound'
import Checkout from './Pages/Payments/Checkout'
import Signup from './Pages/SignUp'
import EditProfile from './Pages/User/EditProfile'
import Profile from './Pages/User/Profile'



function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element = { <HomePage /> }></Route>
        <Route path='/about' element={<AboutUs />}></Route>
        <Route path='/courses' element={<CourseList />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/denied' element={<Denied/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/course/description' element={<CourseDescription/>}></Route>

        <Route path='/user/profile' element={<Profile/>}></Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
        <Route path='/course/create' element={<CreateCourse/>}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
        <Route path='/user/profile'  element={<Profile/>}></Route>
        <Route path='/user/editprofile' element={<EditProfile/>}></Route>
        <Route path='checkout' element={<Checkout />}></Route>
        </Route>

        <Route path='*' element={<NotFound/>}></Route>
      </Routes> 
    </>
  )
}

export default App
