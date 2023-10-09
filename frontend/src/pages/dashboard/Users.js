import React, { useEffect } from "react";
import Layout from "../../layouts/dashboard/Layout";
import UsersList from "../../components/UsersList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User } from "../../features/authSlice";
const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, user } = useSelector((state) => state.auth);

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
  }, [isError, user, navigate]);
  return (
    <Layout>
      <UsersList />
    </Layout>
  );
};

export default Users;
