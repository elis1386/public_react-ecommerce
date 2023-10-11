import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filteredByPrice } from "../store/productsSlice";
import { RootState } from "../store/store";

import Banner from "../components/Banner";
import ProductsList from "../components/ProductsList";
import Subscribe from "../components/Subscribe";
import Categories from "../components/Categories";

const Home = () => {
  const dispatch = useDispatch();
  const {
    products: { list, filtered },
    categories,
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (!list.length) return;
    dispatch(filteredByPrice(100));
  },[dispatch, list.length]);

  return (
    <div>
      <Banner />
      <Categories categories={categories.list} amount={5} />
      <ProductsList products={list} amount={6} title="New products" />
      <ProductsList products={filtered} amount={3} title="Less than 100$" />
      <Subscribe />
    </div>
  );
};

export default Home;
