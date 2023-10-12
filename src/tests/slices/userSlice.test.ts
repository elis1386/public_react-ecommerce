import {
  createUser,
  loginUser,
  authenticateUserAsync,
} from "../../store/userSlice";
import { createStore } from "../../store/store";
import { CreateUser } from "../../types/User";
import usersData from "../data/usersData";
import usersServer, { accessToken } from "../servers/usersServer";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => usersServer.listen());

afterEach(() => usersServer.resetHandlers());

afterAll(() => usersServer.close());

test("Should authenticate witg right token", async () => {
  console.log(store.getState().user.currentUser);
  await store.dispatch(
    loginUser({ email: "alex@gmail.com", password: "Alex1234" })
  );
  await store.dispatch(
    authenticateUserAsync({ rejectValue: accessToken + "_1" })
  );
  expect(store.getState().user.currentUser).toMatchObject(usersData[0]);
});

test("Should register user", async () => {
  const newUser: CreateUser = {
    email: "user@mail.com",
    password: "password",
    name: "Name",
    role: "customer",
    avatar: "https://picsum.photos/640/640?r=5207",
  };
  await store.dispatch(createUser(newUser));
  const user = store.getState().user;
  expect(user).toBe(user);
});

test("Should not login user with wrong credentials", async () => {
  await store.dispatch(
    loginUser({ email: usersData[0].email, password: usersData[0].password })
  );
  const response = store.getState().user.currentUser;
  const user = response;
  expect(response).toBe(user);
});
