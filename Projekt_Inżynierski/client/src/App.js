import { Route, Routes, Navigate } from "react-router-dom"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Main from "./components/Main"
import About from "./components/About"
import Calc from "./components/Calc"
import Cart from "./components/Cart"
import Menu from "./components/Menu"
function App() {
  const user = localStorage.getItem("token")
  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/about" element={<About/>} />
      <Route path="/calc" element={<Calc/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/menu" element={<Menu/>} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  )
}
export default App