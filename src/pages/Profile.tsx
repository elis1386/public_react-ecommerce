import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import { getProducts } from "../store/productsSlice";
import { AppDispatch, RootState } from "../store/store";

import AdminProductList from "../components/AdminProductList";
import AdminCreateProduct from "../components/AdminCreateProduct";

import { mobile, tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  margin: 1.2em;
  ${mobile({ flexDirection: "column", margin: ".5em" })}
`;
const Wrapper = styled.div`
  margin-top: 1.2em;
  width: 30%;
  height: 50vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1em;
  border: 1px solid #eee;
  ${mobile({ flex: "1", width: "100%" })}
`;
const Info = styled.div`
  padding: 1em;
`;
const Text = styled.h4`
  margin: 1em auto;
  text-align: left;
`;
const SpanText = styled.span`
  font-size: 1em;
  font-weight: 400;
  color: teal;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
  width: 80%;
  gap: 1em;
  ${mobile({ width: "100%", marginTop: "1em", margin: "0" })}
`;
const CreateButton = styled.button`
  width: 20%;
  height: 2em;
  padding: 0.3em;
  color: teal;
  background-color: #eeee;
  border: none;
  border-radius: 0.2em;
  ${mobile({ width: "40%",marginTop: "1em" })}
`;
const ListWrapper = styled.div`
  width: 85%;
  ${mobile({ width: "100%" })}
`;
const ProfilePicContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;
const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fir: cover;
`;
const Profile = () => {
  const [isCreateProductVisible, setCreateProductVisible] = useState(false);

  const item = sessionStorage.getItem("user");
  const user = item ? JSON.parse(item) : [];
  const dispatch = useDispatch<AppDispatch>();
  const {
    products: { list },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleCreateProductClick = () => {
    setCreateProductVisible(!isCreateProductVisible);
  };

  return (
    <Container>
      <Wrapper>
        <ProfilePicContainer>
          <Avatar className="avatar" src={user.avatar} alt="" />
        </ProfilePicContainer>
        <Info>
          <Text>
            Username: <SpanText>{user.name}</SpanText>
          </Text>
          <Text>
            Email: <SpanText>{user.email}</SpanText>
          </Text>
        </Info>
      </Wrapper>
      {user && user.role === "admin" && (
        <Box>
          <CreateButton onClick={handleCreateProductClick}>
            Create products
          </CreateButton>
          {isCreateProductVisible && <AdminCreateProduct />}
          <ListWrapper>
            {list.length > 0 && (
              <AdminProductList products={list} amount={16} />
            )}
          </ListWrapper>
        </Box>
      )}
    </Container>
  );
};

export default Profile;
