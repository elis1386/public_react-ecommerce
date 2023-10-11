import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import { AppDispatch, RootState } from "../store/store";
import { getProducts } from "../store/productsSlice";

import ProductsList from "../components/ProductsList";
import Category from "../components/Category";

const Container = styled.div``;

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    products: { list },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (!list.length) return;
    dispatch(getProducts());
  }, [dispatch, list.length]);

  return (
    <Container>
      <Category />
      <ProductsList products={list} amount={24} />
    </Container>
  );
};

export default Products;
