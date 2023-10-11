import { createStore } from "../../store/store";
import productsServer from "../servers/productsServer";
import { CreateProduct } from "../../types/Product";
import {
  createProductAsync,
  deleteProductAsync,
  getProducts,
  filteredByPrice,
  sortByPrice,
} from "../../store/productsSlice";
import productsData from "../data/productData";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => productsServer.listen());

afterEach(() => productsServer.resetHandlers());

afterAll(() => productsServer.close());

describe("Test async thunk actions in productsReducer", () => {
  test("Should fetch all products", async () => {
    await store.dispatch(getProducts());
    const products = store.getState().products.list.length;
    expect(products).toBeGreaterThan(0);
  });

  test("Should delete an existing product", async () => {
    const productIdToDelete = 1;
    const resultAction = await store.dispatch(
      deleteProductAsync(productIdToDelete)
    );
    expect(resultAction.payload).toBe(productIdToDelete);
  });

  test("should create product", async () => {
    const input: CreateProduct = {
      title: "test product",
      description: "test product",
      price: 100,
      categoryId: 1,
      images: ["image 1"],
    };
    await store.dispatch(createProductAsync(input));
    expect(store.getState().products.list.length).toBe(1);
  });
  test("should not create product with wrong id", async () => {
    const input: CreateProduct = {
      title: "test product",
      description: "test product",
      price: 100,
      categoryId: 10,
      images: ["image 1"],
    };
    await store.dispatch(createProductAsync(input));
    expect(store.getState().products.list.length).toBe(1);
  });
  test("Should filter products by price", async () => {
    const price = 50;
    store.dispatch(filteredByPrice(price));
    const filteredProducts = store.getState().products.filtered;
    for (const product of filteredProducts) {
      expect(product.price).toBeLessThanOrEqual(price);
    }
  });

  test("Should sort products by price", async () => {
    const price_min = 0;
    const price_max = 100;
    store.dispatch(sortByPrice({ price_min, price_max }));
    const sortedProducts = store.getState().products.sorted;
    for (const product of sortedProducts) {
      expect(product.price).toBeGreaterThanOrEqual(price_min);
      expect(product.price).toBeLessThanOrEqual(price_max);
    }
    for (let i = 1; i < sortedProducts.length; i++) {
      expect(sortedProducts[i].price).toBeGreaterThanOrEqual(
        sortedProducts[i - 1].price
      );
    }
  });
});
