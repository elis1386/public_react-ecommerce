import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { ProductItem } from "../types/Product";

import { mobile, tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em;
  justify-content: center;
  ${tablet({ margin: "0" })}
`;
const Title = styled.h3`
  text-align: center;
`;
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const Box = styled.div`
  flex: 1;
  margin: 0.5em;
  width: 340px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
  position: relative;
  border-radius: 1.5em;
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover ${Info} {
    opacity: 1;
    transition: all 0.5s ease;
    cursor: pointer;
    border-radius: 1.5em;
  }
  /*   ${mobile({ width: "180px", justifyContent: "space-between" })} */
`;
const Image = styled.img`
  height: 90%;
  width: 90%;
  border-radius: 1.5em;
  object-fit: cover;
  padding: 1em;
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Price = styled.span`
  font-size: 1.2em;
  line-height: 1.4em;
`;
const PriceContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: teal;
  color: white;
  padding: 0.3em 0.5em;
  border-radius: 0.5em;
  font-weight: 700;
`;

const ProductsList = ({
  products = [] as ProductItem[],
  amount = 10,
  title = "",
}) => {
  const list = products.filter((_, i) => i < amount);

  return (
    <>
      <Title>{title}</Title>

      <Container>
        {list.map(({ id, images, price }: ProductItem) => (
          <Link to={`/product/${id}`} key={id}>
            <Box key={id}>
              <Image src={images} />
              <Info>
                <Icon>
                  <ShoppingCartOutlinedIcon />
                </Icon>
                <Icon>
                  <SearchOutlinedIcon />
                </Icon>
                <Icon>
                  <FavoriteBorderOutlinedIcon />
                </Icon>
              </Info>
              <PriceContainer>
                <Price>{price}$</Price>
              </PriceContainer>
            </Box>
          </Link>
        ))}
      </Container>
    </>
  );
};

export default ProductsList;
