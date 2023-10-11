import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import { CreateUser } from "../types/User";
import { createUser } from "../store/userSlice";
import { AppDispatch } from "../store/store";

import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 80vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://fastly.picsum.photos/id/199/640/640.jpg?hmac=in415zt2f_v2Vox4VGUjf0xCs_T49mDzoo7U_d9FJso")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({  height: "55vh"})}
`;
const Wrapper = styled.div`
  width: 30%;
  padding: 1.4em;
  background-color: white;
  ${mobile({  width: "60%"})}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 1.2em auto;
  border-radius: 0.3em;
`;

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [values, setValues] = useState<CreateUser>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;

    try {
      await dispatch(createUser(values));
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="name"
            name="name"
            type="text"
            value={values.name}
            autoComplete="off"
            onChange={handleChange}
          />
          <Input
            placeholder="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="password"
            type="password"
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
          <Input
            placeholder="url"
            type="text"
            name="avatar"
            value={values.avatar}
            onChange={handleChange}
            required
          />
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
