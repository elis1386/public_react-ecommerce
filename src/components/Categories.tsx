import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { CategoryItem } from "../types/Category";

import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 2em;
  margin: 3em;
  ${mobile({ gap: "1em", fontSize: ".8em", margin: "1.2em 0" })}
`;
const CategoryItemS = styled.div``;
const StyledLink = styled(Link)`
  color: #000000;
  padding-bottom: 0.2em;
  transition: color 0.2s ease, border-bottom 0.2s ease;
  text-decoration: none;
  font-size: 1.4em;
  &:hover {
    color: teal;
    border-bottom: 2px solid teal;
  }
`;

const Categories = ({ categories = [] as CategoryItem[], amount = 0 }) => {
  const list = categories.filter((_, i) => i < amount);

  return (
    <Container>
      {list.map(({ id, name }) => (
        <CategoryItemS key={id}>
          <StyledLink to={`/categories/${id}`}>{name}</StyledLink>
        </CategoryItemS>
      ))}
    </Container>
  );
};

export default Categories;
