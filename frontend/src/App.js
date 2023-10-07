import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/dashboard/Login";
import Register from "./pages/dashboard/Register";
import Users from "./pages/dashboard/Users";
import Products from "./pages/dashboard/Products";
import AddUser from "./pages/dashboard/AddUser";
import EditUser from "./pages/dashboard/EditUser";
import EditProduct from "./pages/dashboard/EditProduct";
import AddProduct from "./pages/dashboard/AddProduct";
import Home from "./pages/user/Home";
import NotFound from "./pages/user/NotFound";
import ProductsUser from "./pages/user/Products";
import OurConcern from "./pages/user/OurConcern";
import CompanyProfile from "./pages/user/CompanyProfile";
const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          {/* USER */}
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/product" element={<ProductsUser />} />
          <Route path="/our-concern" element={<OurConcern />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          {/* ADMIN */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
