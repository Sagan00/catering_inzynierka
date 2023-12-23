import { Route, Routes, Navigate } from "react-router-dom"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Main from "./components/Main"
import About from "./components/About"
import Calc from "./components/Calc"
import Meals from "./components/MealsList" 
import Cart from "./components/Cart"
import Menu from "./components/Menu"
import EditUser from "./components/EditUser"

function App() {
  const user = localStorage.getItem("token")
  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/" element={<Navigate replace to="/login" />} />
      {user &&<Route path="/about" element={<About/>} />}
      <Route path="/about" element={<Navigate replace to="/login" />} />
      {user &&<Route path="/calc" element={<Calc/>} />}
      <Route path="/calc" element={<Navigate replace to="/login" />} />
      {user &&<Route path="/cart" element={<Cart/>} />}
      <Route path="/cart" element={<Navigate replace to="/login" />} />
      {user &&<Route path="/mealsList" element={<Meals/>} />}
      <Route path="/mealsList" element={<Navigate replace to="/login" />} />
      {user &&<Route path="/menu" element={<Menu/>} />}
      <Route path="/menu" element={<Navigate replace to="/login" />} />
      {user &&<Route path="/edituser" element={<EditUser/>} />}
      <Route path="/edituser" element={<Navigate replace to="/login" />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      
    </Routes>
  )
}
export default App