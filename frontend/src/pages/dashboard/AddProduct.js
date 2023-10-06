import React, { useEffect } from "react";
import Layout from "../../layouts/dashboard/Layout";
import FormAddProduct from "../../components/FormAddProduct";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User } from "../../features/authSlice";
const AddProduct = () => {
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
      <FormAddProduct />
    </Layout>
  );
};

export default AddProduct;
