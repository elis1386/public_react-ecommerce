import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import { AppDispatch } from "../store/store";
import { loginUser } from "../store/userSlice";

import { UserCredentials } from "../types/User";

import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 80vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(https://fastly.picsum.photos/id/168/640/640.jpg?hmac=Hkod0E9jlYXekhrQfsVnhFp4xf17uakIRh9_8dUGMzw)
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

`;
const Wrapper = styled.div`
  width: 25%;
  padding: 1.4em;
  background-color: white;
  ${mobile({  width: "60%"})}
`;
const Title = styled.h1`
  font-size: 1.6em;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 0.8em 0;
  padding: 0.8em;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 0.8em 1em;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 0.8em auto;
  border-radius: 0.3em;
`;
const Link = styled.a`
  margin: 0.4em 0;
  font-size: 0.8em;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [values, setValues] = useState<UserCredentials>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await dispatch(loginUser(values));

      if (response && sessionStorage.getItem("user")) {
        const user = JSON.parse(sessionStorage.getItem("user") || "{}");

        let roleUser;

        if (user && user.role === "admin") {
          roleUser = "admin";
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          roleUser = "currentUser";
        }
        navigate("/profile");
      } else {
        setErrorMessage("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }

    setValues({ email: "", password: "" });
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
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
          <Button>LOGIN</Button>
          <Link>Forgot your password?</Link>
          <Link>Create an account.</Link>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </Form>
      </Wrapper>
    </Container>
  );
};
export default SignIn;
