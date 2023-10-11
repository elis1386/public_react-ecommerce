import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useGetProductQuery } from "../store/apiSlice";
import { getRelatedProducts } from "../store/productsSlice";

import Product from "./Product";
import ProductsList from "./ProductsList";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { list, related } = useSelector(({ products }) => products);
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, isSuccess]);

  useEffect(() => {
    if (!data || !list.length) return;

    dispatch(getRelatedProducts(data.category.id));
  }, [data, dispatch, list.length]);
  return (
    <div>
      <Product {...data} />
      <ProductsList products={related} amount={4} title="Related products" />
    </div>
  );
};

export default SingleProduct;
