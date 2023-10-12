import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { mobile} from "../responsive";



const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeee;
  ${mobile({ display: "none" })}
`;

const Wrapper = styled.div`
  height: 50%;
  display: flex;
  transition: all 1.5s ease;

`;

const Box = styled.div`
  display: flex;
  align-items: center;
`;
const ImgContainer = styled.div`
  flex: 2;
  margin: 1em 2em;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  width: 80%;
  height: 400px;
  object-fit: contain;
  border-radius: 0.3em;
`;
const InfoContainer = styled.div`
  flex: 2;
  padding: 2em;
`;
const Title = styled.h1`
  font-size: 3em;
`;
const Desc = styled.p`
  margin: 2.4em 0px;
  font-size: 1em;
  font-weight: 400;
  letter-spacing: .3em;
`;
const Button = styled.button`
  padding: .8em 1.2em;
  font-size: 1.2em;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: teal;
    border: 2px solid teal;
  }
`;

const Banner = () => {
  const { list } = useSelector(({ products }) => products);
  const randomProduct = list.length > 0 ? list[0] : null;
  return (
    <Container>
      <Wrapper>
        {randomProduct && (
          <Box>
            <ImgContainer>
              <Image src={randomProduct.images[0]} />
            </ImgContainer>
            <InfoContainer>
              <Title>{randomProduct.title}</Title>
              <Desc>{randomProduct.description}</Desc>
             <Link to="/products"> <Button>SHOP NOW</Button></Link>
            </InfoContainer>
          </Box>
        )}
      </Wrapper>
    </Container>
  );
};

export default Banner;
