import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import styled from "styled-components";

import { AppDispatch } from "./store/store";
import { getCategories } from "./store/categoriesSlice";
import { getProducts } from "./store/productsSlice";
import { ROUTES } from "./utils/routes";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import SingleCategory from "./components/SingleCategory";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Container = styled.div``;

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.PRODUCTS} element={<Products />}></Route>
        <Route path={ROUTES.PRODUCT} element={<Product />}></Route>
        <Route path={ROUTES.CATEGORY} element={<SingleCategory />}></Route>
        <Route path={ROUTES.CART} element={<Cart />}></Route>
        <Route path={ROUTES.SIGNUP} element={<SignUp />}></Route>
        <Route path={ROUTES.SIGNIN} element={<SignIn />}></Route>
        <Route path={ROUTES.PROFILE} element={<Profile />}></Route>
        <Route path="*" element={<p>Not found</p>}></Route>
      </Routes>
      <Footer />
    </Container>
  );
};
export default App;
