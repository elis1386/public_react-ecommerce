import { rest } from "msw";
import { setupServer } from "msw/node";

import { BASE_URL } from "../../utils/constants";

import usersData from "../data/usersData";
import { UserShema } from "../../types/User";

export const accessToken = "my-access-token";

export const handlers = [
  rest.get(`${BASE_URL}/users`, async (req, res, ctx) => {
    return res(ctx.json(usersData));
  }),

  rest.post(`${BASE_URL}/auth/login`, async (req, res, ctx) => {
    const { email, password } = await req.json();
    const foundUser = usersData.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      const token = accessToken + "_" + foundUser.id;
      return res(ctx.json({ access_token: token }));
    } else {
      ctx.status(401);
      return res(ctx.text("User was not authenticated"));
    }
  }),

  rest.get(`${BASE_URL}/auth/profile`, async (req, res, ctx) => {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    const originalToken = token?.split("_")[0];
    const userId = token?.split("_")[1];
    const foundUser = usersData.find((user) => user.id === Number(userId));
    if (originalToken === accessToken && foundUser) {
      return res(ctx.json(foundUser));
    } else {
      ctx.status(401);
      return res(ctx.text("Cannot authenticate user"));
    }
  }),

  rest.post(`${BASE_URL}/users`, async (req, res, ctx) => {
    const user = await req.json();
    const expectedUser: UserShema = {
      id: usersData.length + 1,
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    };
    return res(ctx.json(expectedUser));
  }),
];

const usersServer = setupServer(...handlers);

export default usersServer;
