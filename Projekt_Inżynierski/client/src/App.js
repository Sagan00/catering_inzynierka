// App.jsx
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./components/Main";
import About from "./components/About";
import Calc from "./components/Calc";
import Meals from "./components/MealsList"; 
import Cart from "./components/Cart";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Account from "./components/Account";
import Panel from "./components/Panel";
import UserMessages from "./components/UserMessages"; 
import Payment from "./components/Payment";
import OrderHistory from "./components/OrderHistory";

function App() {
  const user = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  return (
    <Routes>
      {user && <Route path="/payment" element={<Payment />} />}
      <Route path="/payment" element={<Navigate replace to="/login" />} />
      {user && <Route path="/" element={<Main />} />}
      <Route path="/" element={<Navigate replace to="/login" />} />
      {user && <Route path="/about" element={<About />} />}
      <Route path="/about" element={<Navigate replace to="/login" />} />
      {user && <Route path="/calc" element={<Calc />} />}
      <Route path="/calc" element={<Navigate replace to="/login" />} />
      {user && <Route path="/cart" element={<Cart />} />}
      <Route path="/cart" element={<Navigate replace to="/login" />} />
      {user && <Route path="/mealsList" element={<Meals />} />}
      <Route path="/mealsList" element={<Navigate replace to="/login" />} />
      {user && <Route path="/contact" element={<Contact />} />}
      <Route path="/contact" element={<Navigate replace to="/login" />} />
      {user && <Route path="/menu" element={<Menu />} />}
      <Route path="/menu" element={<Navigate replace to="/login" />} />
      {user && userRole === "Admin" && <Route path="/panel" element={<Panel />} />}
      <Route path="/panel" element={<Navigate replace to="/login" />} />
      {user && <Route path="/panel/messages/:userId" element={<UserMessages />} />}
      <Route path="/panel/messages/:userId" element={<Navigate replace to="/login" />} />
      {user && <Route path="/account" element={<Account />} />}
      <Route path="/account" element={<Navigate replace to="/login" />} />
      {user && <Route path="/orderHistory" element={<OrderHistory />} />}
      <Route path="/orderHistory" element={<Navigate replace to="/login" />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
    </Routes>
  );
}

export default App;
