import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";

import styled from "styled-components";

import {
  getProductByIdAsync,
  updateProductAsync,
} from "../store/productsSlice";
import { AppDispatch } from "../store/store";
import {  UpdateProduct } from "../types/Product";

import { mobile, tablet } from "../responsive";

const Container = styled.div`
  width: 60%;
  background-size: cover;
  display: flex;
  align-items: start;
  justify-content: start;
  ${tablet({ width: "150%",  alignItems: "center"})}
  ${mobile({ width: "180%",  alignItems: "center"})}
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
  margin: 1.2em 0.8em 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 0.9em 1.2em;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 1.2em auto;
  border-radius: 0.3em;
  text-align: center;
  ${tablet({ width: "50%" })}

`;



const AdminUpdateProduct = ({ id, closeForm }: any) => {
const initialFormData = {
  id: id,
  update: {
    title: "",
    price: 0,
    description: "",
    categoryId: 0,
    images: [""],
  },
};

  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<UpdateProduct>(initialFormData);

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await dispatch(getProductByIdAsync(id));

        setFormData({
          id: id,
          update: response.payload as {
            title: string;
            price: number;
            description: string;
            images: string[];
            categoryId: number;
          }
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductInfo();
  }, [id, dispatch]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    const updateData = {
      title: formData.update.title,
      price: formData.update.price,
      description: formData.update.description,
      categoryId: formData.update.categoryId,
      images: formData.update.images,
    };
    dispatch(updateProductAsync({ id: id, update: updateData }));
    setFormData(initialFormData);
    closeForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      update: {
        ...formData.update,
        [name]: value,
      },
    });
  };
  return (
    <Container>
      <Wrapper>
        <Title>Udpate current product</Title>
        <Form onSubmit={handleUpdate}>
          <Input
            placeholder="Title"
            type="text"
            name="title"
            value={formData.update.title}
            onChange={handleChange}
          />
          <Input
            placeholder="Price"
            type="number"
            name="price"
            value={formData.update.price}
            onChange={handleChange}
          />
          <Input
            placeholder="Description"
            type="text"
            name="description"
            value={formData.update.description}
            onChange={handleChange}
          />
          <Input
            placeholder="Category ID"
            type="text"
            name="categoryId"
            value={formData.update.categoryId}
            onChange={handleChange}
          />
          <Input
            placeholder="Images"
            type="text"
            name="images"
            value={formData.update.images}
            onChange={handleChange}
          />
          <Button type="submit">UPDATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default AdminUpdateProduct;


