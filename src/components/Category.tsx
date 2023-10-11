import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import { mobile, tablet } from "../responsive";

import { useGetProductsQuery } from "../store/apiSlice";
import { selectSortedProducts, sortByPrice } from "../store/productsSlice";

import { RootState } from "../store/store";
import ProductsList from "./ProductsList";

const Container = styled.div`
  margin: 1em;
`;
const Wrapper = styled.section`
  width: 100%;
  flex-grow: 1;
`;
const Title = styled.h3`
  text-align: center;
`;
const Filters = styled.form`
  display: flex;
  gap: 1.4em;
  width: 100%;
  margin: 0 1.6em;
  ${tablet({ justifyContent: "center", margin: "0"  })}
`;
const Filter = styled.div`
  background: #eeee;
  border-radius: 0.7em;
  padding: 0.9em 1.2em;
  width: max-content;
  display: flex;
  align-items: center;
  min-width: 20%;
  ${mobile({ padding: "0.5em", width: "min-content"})}
`;

const FilterInput = styled.input`
  font-weight: 400;
  font-size: 1em;
  line-height: 1em;
  border: none;
  padding: 0.5em 0.8em;
  border-radius: 0.5em;
  ${mobile({ padding: "0.5em", width: "60px"})}
`;

const FilterLabel = styled.span`
  font-weight: 400;
  font-size: 1em;
  line-height: 1em;
  color: var(--dark-sea);
  text-align: right;
  margin-right: 1em;
 
`;

const Category = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const numericId = Number(id);
  const sortedProducts = useSelector(selectSortedProducts);

  const { data: productsList } = useGetProductsQuery({
    categoryId: numericId,
    title: "",
    price: 0,
    price_min: 0,
    price_max: 0,
    priceRange: [0, 0],
    offset: 0,
  });

  const { list: categoriesList } = useSelector(
    (state: RootState) => state.categories
  );
  const [isSortingApplied, setIsSortingApplied] = useState(false);
  const defaultValues = {
    price_min: 0,
    price_max: 0,
  };
  const defaultParams = {
    categoryId: numericId,
    ...defaultValues,
  };
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!id) return;

    setValues(defaultValues);
    setParams({ ...defaultParams, categoryId: numericId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericId]);

  useEffect(() => {
    if (!id || !categoriesList.length) return;

    const foundCategory = categoriesList.find((item) => item.id === numericId);
    if (foundCategory) {
      setCategory(foundCategory.name);
    }
  }, [categoriesList, id, dispatch, numericId]);

  const handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      sortByPrice({
        price_min: values.price_min,
        price_max: values.price_max,
      })
    );
    setParams({ ...params, ...values });
    setIsSortingApplied(true);
  };

  return (
    <Container>
      <Wrapper>
        <Title>{category}</Title>
        <Filters onSubmit={handleSubmit}>
          <Filter>
            <FilterLabel>Price from</FilterLabel>
            <FilterInput
              type="number"
              name="price_min"
              onChange={handleChange}
              placeholder="0"
              value={values.price_min}
            />
          </Filter>
          <Filter>
            <FilterLabel>Price to</FilterLabel>
            <FilterInput
              type="number"
              name="price_max"
              onChange={handleChange}
              placeholder="0"
              value={values.price_max}
            />
          </Filter>
          <button type="submit" hidden />
        </Filters>
        {isSortingApplied ? (
          <ProductsList products={sortedProducts} amount={15} />
        ) : (
          <ProductsList products={productsList} amount={15} />
        )}
      </Wrapper>
    </Container>
  );
};

export default Category;
