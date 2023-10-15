import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { decreaseQuantity, increaseQuantity } from "../store/cartSlice";
import { selectCartItems, selectTotalPrice } from "../selectors/cartSelector";

import { mobile, tablet } from "../responsive";

const Container = styled.div`
  ${tablet({ flexDirection: "column" })}
`;

const Wrapper = styled.div`
  padding: 1.4em;
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin: 0;
`;
const Top = styled.div`
  display: flex;
  justify-content: end;
  padding: 1em;
`;
const TopButton = styled.button`
  padding: 0.8em;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: #9e9e9e;
  color: white;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
  overflow: scroll;
  height: 70vh;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2em;
  ${mobile({
    flexDirection: "column",
    border: "1px #eee solid",
    padding: "1em",
  })}
`;
const ProductDetail = styled.div`
  flex: 1;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  ${tablet({ width: "100%" })}
`;
const Details = styled.div`
  padding: 1.2em;
  gap: 1.4em;
  display: flex;
  justify-content: center;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.4em;
`;
const ProductAmount = styled.div`
  font-size: 1.6em;
  margin: 0.4em;
`;
const ProductPrice = styled.div`
  font-size: 2em;
  font-weight: 200;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 0.8em;
  padding: 1.4em;
  height: 50vh;
  ${mobile({
    border: "none",
    borderTop: "2px solid #eee",
    borderRadius: "inherit",
  })}
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 2em 0;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 1.4em;
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 0.8em;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const EmptyCartMessage = styled.h4`
  margin: auto;
  text-align: center;
`;
const Cart = () => {
  const item = localStorage.getItem("products")
  const products = item ? JSON.parse(item) : undefined
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          {cartItems.length > 0 && (
            <Link to={"/products"}>
              <TopButton>CONTINUE SHOPPING</TopButton>
            </Link>
          )}
        </Top>
        <Bottom>
          {cartItems.length === 0 ? (
            <EmptyCartMessage>
              Your cart is empty. <Link to={"/products"}>Start shopping</Link>.
            </EmptyCartMessage>
          ) : (
            <Info>
              {cartItems.map((product: any) => (
                <Product>
                  <ProductDetail>
                    <Image src={product.images[0]} />
                  </ProductDetail>
                  <PriceDetail>
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.name}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product.id}
                      </ProductId>
                    </Details>
                  </PriceDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <AddIcon
                        onClick={() => dispatch(increaseQuantity(product.id))}
                      />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <RemoveIcon
                        onClick={() => dispatch(decreaseQuantity(product.id))}
                      />
                    </ProductAmountContainer>
                    <ProductPrice>
                      {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
            </Info>
          )}
          {cartItems.length > 0 && (
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>{totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <Button>CHECKOUT NOW</Button>
            </Summary>
          )}
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
