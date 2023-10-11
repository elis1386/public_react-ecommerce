import React from "react";

import styled from "styled-components";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import { mobile} from "../responsive";

const Container = styled.div`
  height: 50vh;
  background-color: #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({ height: "25vh"})}
`;
const Title = styled.h1`
  font-size: 4em;
  margin: 0 0 0.2em 0;
  ${mobile({ gap: "1em", fontSize: "2em", margin: "0" })}
`;
const Desc = styled.div`
  font-size: 1.6em;
  font-weight: 300;
  margin-bottom: 1.2em;
  ${mobile({fontSize: "1em"})}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: none;
  border-radius: 0.3em;
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 2em;
  border-radius: 0.3em;
`;
const Button = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: teal;
  color: white;
  border-radius: 0.3em;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
`;

const NewsLetter = () => {
  return (
    <Container>
      <Title>Subscribe</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <SendOutlinedIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsLetter;
