import React from "react";

import styled from "styled-components";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  border-top: 1px solid #eeeeee;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.2em;
  ${mobile({ display: "none" })}
`;
const Logo = styled.h1``;
const Desc = styled.p`
  margin: 0.2em 0;
`;
const Center = styled.div`
  flex: 1;
  padding: 1.4em;
  ${mobile({ display: "none" })}
`;
const Title = styled.h3`
  margin-bottom: 2em;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 0.8em;
`;
const Right = styled.div`
  flex: 1;
  padding: 1.2em;
`;
const ContactItem = styled.div`
  margin-bottom: 1.2em;
  display: flex;
  align-items: center;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>E-shop</Logo>
        <Desc>
          Platzi Fake Store API can be used with any type of project that needs
          products, users, categories, authentication, and users in JSON format.
        </Desc>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>All products</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <HomeOutlinedIcon style={{ marginRight: ".8em" }} /> 02160 Espoo,
          Rantatie 35
        </ContactItem>
        <ContactItem>
          <MailOutlineIcon style={{ marginRight: ".8em" }} /> contact@eShop.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
