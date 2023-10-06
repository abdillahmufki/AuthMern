import React, { useEffect } from "react";

import Layout from "../../layouts/dashboard/Layout";
import FormEdituser from "../../components/FormEditUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User } from "../../features/authSlice";
const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(User());
  }, [dispatch]);

  useEffect(() => {
    dispatch(User());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/admin");
    }

    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, navigate, user]);

  return (
    <Layout>
      <FormEdituser />
    </Layout>
  );
};

export default EditUser;
