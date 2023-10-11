import { configureStore } from "@reduxjs/toolkit";
import { rest } from "msw";
import { setupServer } from "msw/node";
import categoriesReducer, { getCategories } from "../../store/categoriesSlice";

import categoriesData from "../data/categoriesData";

const server = setupServer(
  rest.get("https://api.escuelajs.co/api/v1/categories", (req, res, ctx) => {
    return res(ctx.json(categoriesData));
  })
);

let store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  store = configureStore({
    reducer: {
      categories: categoriesReducer,
    },
  });
});
afterAll(() => server.close());

describe("Test categoriesSlice", () => {
  it("should handle getCategories.fulfilled", async () => {
    await store.dispatch(getCategories());
    const state = store.getState().categories;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(false);
    expect(state.list).toEqual(categoriesData);
  });

  it("should handle getCategories.rejected", async () => {
    server.use(
      rest.get(
        "https://api.escuelajs.co/api/v1/categories",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    await store.dispatch(getCategories());
    const state = store.getState().categories;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(true);
  });
});
