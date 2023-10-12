import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import { createProductAsync } from "../store/productsSlice";
import { AppDispatch } from "../store/store";
import { CreateProduct } from "../types/Product";

import { mobile, tablet } from "../responsive";

const Container = styled.div`
  width: 60%;
  background-size: cover;
  display: flex;
  align-items: start;
  justify-content: start;
  ${tablet({ width: "140%",  alignItems: "center"})}
  ${mobile({ width: "180%", height: "50vh", alignItems: "center"})}
`;

const Wrapper = styled.div`
  width: 50%;
  padding: 1.2em;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 1.4em;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 1.2em .8em 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: .9em 1.2em;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 1.2em auto;
  border-radius: 0.3em;
  text-align: center;
`;

const AdminCreateProduct = () => {
  const [values, setValues] = useState<CreateProduct>({
    title: "",
    price: 0,
    description: "",
    images: [],
    categoryId: 0
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createProductAsync(values));
      console.log(values);
      setValues({
        title: "",
        price: 0,
        description: "",
        images: [],
        categoryId: 0
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "images") {
      setValues({ ...values, [name]: [...values.images, value] });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE NEW PRODUCT</Title>
        <Form onSubmit={handleCreateProduct}>
          <Input
            placeholder="title"
            name="title"
            type="text"
            value={values.title}
            autoComplete="off"
            onChange={handleChange}
          />
          <Input
            placeholder="price"
            type="price"
            name="price"
            value={values.price}
            onChange={handleChange}
          />
          <Input
            placeholder="description"
            type="description"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
          <Input
            placeholder="categoryId"
            type="categoryId"
            name="categoryId"
            value={values.categoryId || ""} // Ensure it's not undefined
            onChange={handleChange}
          />
          <Input
            placeholder="url"
            type="images"
            name="images"
            value={values.images}
            onChange={handleChange}
          />
          <Button type="submit">
            CREATE
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default AdminCreateProduct;
