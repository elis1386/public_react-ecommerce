import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { mobile, tablet } from "../responsive";

import { addItemToCart } from "../store/cartSlice";
import { CartItem } from "../types/CartItem";
import { ProductItem } from "../types/Product";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 4em;
  display: flex;
  ${tablet({ gap: "2em" })}
  ${mobile({ gap: "1em", padding: "1em" })}
`;
const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ flex: "1.3" })}
`;
const Image = styled.img`
  width: 60%;
  height: 60vh;
  object-fit: cover;
  ${tablet({ width: "100%", height: "45vh" })}
  ${mobile({ width: "100%", height: "30vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2em;
  ${tablet({
    alignItems: "center",
    justifyContent: "center",
    gap: "2em",
  })}
`;
const Title = styled.h1`
  font-weight: 200;
  ${mobile({ textAlign: "center", margin: "0",fontSize: "1.4em" })}
`;
const Desc = styled.p`
  margin: 1.4em 0;
  text-align: center;
  width: 50%;
  ${tablet({ width: "80%" })}
  ${mobile({ display: "none" })}
`;
const Price = styled.span`
  font-weight: 400;
  font-size: 3em;
  color: teal;
  ${mobile({ fontSize: "2em" })}
`;
const Button = styled.button`
  padding: 1em 2.6em;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  display: block;
  width: 40%;

  &:hover {
    background-color: teal;
    color: white;
  }
  ${tablet({ width: "80%" })}
  ${mobile({ padding: "1em" })}
`;

const Product = (product: ProductItem) => {
  const { title, price, images, description } = product;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItemToCart(product as CartItem));
  };

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={images} />
        </ImgContainer>
        <InfoContainer>
          <Title>{title}</Title>
          <Desc>{description}</Desc>
          <Price>{price}$</Price>
          <Button onClick={addToCart}>ADD TO CART</Button>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default Product;
