import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { clearCurrentUser } from "../store/userSlice";
import { useGetProductsQuery } from "../store/apiSlice";
import { AppDispatch } from "../store/store";

import { mobile, tablet } from "../responsive";

const Container = styled.div`
  height: 70px;
  padding: 1.4em;
  border-bottom: 1px solid #e0e0e0;
  ${tablet({ height: "40px", margin: "0" })}
  ${mobile({ padding: "1em" })}
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${tablet({ height: "50px", margin: "0" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ flex: "2" })}
`;
const SearchContainer = styled.div`
  border: 0.1em solid lightgray;
  display: flex;
  align-items: center;
  padding: 0.4em;
  position: relative;
  ${mobile({ display: "none" })}
`;
const Input = styled.input`
  border: 1px solid transparent;
  &&:focus {
    outline: none;
  }
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.a`
  font-size: 3em;
  font-weight: bold;
  &:hover {
    color: teal;
  }
  ${tablet({ fontSize: "2em" })}
  ${mobile({ fontSize: "1em" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.8em;
  ${mobile({ flex: 2, justifyContent: "center", gap: 0 })}
`;
const MenuItem = styled.div`
  font-size: 1em;
  cursor: pointer;
  &:hover {
    color: teal;
  }
  ${mobile({ fontSize: ".7em", marginLeft: "1em" })}
`;
const Box = styled.div`
  z-index: 9;
  top: 120%;
  position: absolute;
  width: 100%;
  left: 0;
  max-height: 300px;
  overflow-y: auto;
  padding: 1em;
  display: flex;
  flex-direction: column;
  row-gap: 0.7em;
  background: #eeee;
  border-radius: 0.7em;
`;
const Item = styled.div`
  font-size:.8em;
  color: #576067;
  display: flex;
  align-items: center;
  column-gap: 1em;
  text-decoration: none;

  &&:hover {
    color: #eeee);
  }
`;
const Image = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0.5em;
  height: 50px;
  width: 50px;
`;
const ItemText = styled.div`
  font-size: 1em;
  color: black;
`;
const StyledLink = styled(Link)({
  textDecoration: "none",
});

const Header = () => {
  const [search, setSearch] = useState("");
  const { currentUser } = useSelector(({ user }) => user);

  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading } = useGetProductsQuery({
    title: search,
    price: 0,
    price_min: 0,
    price_max: 0,
    priceRange: [0, 0],
    categoryId: 0,
    offset: 0,
  });

  const handleSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };
  const readInput = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const handleLogout = () => {
    dispatch(clearCurrentUser());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}>
            <Logo>E-shop</Logo>
          </Link>
        </Left>
        <Center>
          <SearchContainer>
            <Input
              placeholder="Search…"
              value={search}
              name="search"
              autoComplete="off"
              onChange={handleSearch}
            />
            <SearchOutlinedIcon
              style={{ color: "gray", fontSize: "1em", marginLeft: "auto" }}
              onClick={readInput}
            />
            {search && (
              <Box>
                {isLoading
                  ? "Loading"
                  : !data?.length
                  ? "No results"
                  : data.map(({ title, images, id }) => (
                      <StyledLink
                        to={`product/${id}`}
                        onClick={() => setSearch("")}
                        key={id}>
                        <Item>
                          <Image
                            style={{ backgroundImage: `url(${images[0]})` }}
                          />
                          <ItemText>{title}</ItemText>
                        </Item>
                      </StyledLink>
                    ))}
              </Box>
            )}
          </SearchContainer>
        </Center>
        <Right>
          {currentUser ? (
            <>
              <Link
                to="/profile"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}>
                <MenuItem>{currentUser?.name}</MenuItem>
              </Link>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/SignIn"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}>
                <MenuItem>SIGN IN</MenuItem>
              </Link>
              <Link
                to="/SignUp"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}>
                <MenuItem>SIGN UP</MenuItem>
              </Link>
            </>
          )}
          <MenuItem>
            <Link to="/cart">
              <ShoppingCartOutlinedIcon />
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
