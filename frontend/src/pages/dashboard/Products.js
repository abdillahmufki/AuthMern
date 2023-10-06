import React, { useEffect } from "react";
import Layout from "../../layouts/dashboard/Layout";
import ProductList from "../../components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User } from "../../features/authSlice";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(User());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/admin");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default Products;
