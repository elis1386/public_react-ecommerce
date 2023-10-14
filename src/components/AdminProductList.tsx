import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import { deleteProductAsync } from "../store/productsSlice";
import { AppDispatch, RootState } from "../store/store";
import { ProductItem } from "../types/Product";

import AdminUpdateProduct from "./AdminUpdateProduct";

const CustomList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CustomListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8em;
  border: 1px solid #eee;
  margin-bottom: 0.8em;
`;

const CustomListItemText = styled.span`
  flex-grow: 1;
  margin-right: 0.8em;
`;

const CustomListButton = styled.button`
  background-color: #f05635;
  color: white;
  border: none;
  padding: 0.8em 1em;
  cursor: pointer;
  border-radius: 0.5em;
`;
const CustomUpdateButton = styled.button`
  background-color: #40a97e;
  color: white;
  border: none;
  padding: 0.8em 1em;
  cursor: pointer;
  border-radius: 0.5em;
  margin-right: .8em;
`;
const PicContainer = styled.div`
  padding: 0.6em;
`;
const ProductImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const AdminProductList = ({ products = [] as ProductItem[], amount = 0 }) => {
  const dispatch = useDispatch<AppDispatch>();

  const limitedProducts = products.slice(0, amount);
  const isLoading = useSelector((state: RootState) => state.products.isLoading);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<number | null>(null);


  const handleDeleteProduct = async (id: number) => {
    try {
      dispatch(deleteProductAsync(id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleUpdateProduct = (id: number) => {
    setShowUpdateForm(true);
    setCurrentProductId(id);
  };
  const closeUpdateForm = () => {
    setShowUpdateForm(false);
  };

  return (
    <>
      {showUpdateForm && <AdminUpdateProduct id={currentProductId} closeForm={closeUpdateForm} />}

      <CustomList>
        {limitedProducts.map(({ id, title, images }: ProductItem) => (
          <CustomListItem key={id} style={{ backgroundColor: currentProductId === id ? '#b2d8d8' : 'transparent' }}>
            <PicContainer>
              <ProductImg src={images[0]} alt="" />
            </PicContainer>
            <CustomListItemText> product id: {id}</CustomListItemText>
            <CustomListItemText>{title}</CustomListItemText>
            <CustomUpdateButton onClick={() => handleUpdateProduct(id)}>
              {isLoading ? "Updating..." : "Update"}
            </CustomUpdateButton>
            <CustomListButton onClick={() => handleDeleteProduct(id)}>
              {isLoading ? "Deleting..." : "Delete"}
            </CustomListButton>
          </CustomListItem>
        ))}
      </CustomList>
    </>
  );
};

export default AdminProductList;
