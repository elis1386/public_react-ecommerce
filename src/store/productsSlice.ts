import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import axios from "axios";

import { ProductItem } from "../types/Product";
import { CreateProduct } from "../types/Product";

import { BASE_URL } from "../utils/constants";
import { shuffle } from "../utils/common";
import { RootState } from "./store";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios(`${BASE_URL}/products`);
    return response.data;
  }
);
export const createProductAsync = createAsyncThunk(
  "products/createProductAsync",
  async (newProduct: CreateProduct, thunkAPI) => {
    try {
      const result = await axios.post<ProductItem>(
        `${BASE_URL}/products`,
        newProduct
      );
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteProductAsync = createAsyncThunk(
  "deleteProductAsync",
  async (id: number, thunkAPI) => {
    try {
      const result = await axios.delete<boolean>(`${BASE_URL}/products/${id}`);
      if (!result.data) {
        throw new Error("Cannot delete");
      }
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const filterProductsByCategory = createAsyncThunk<ProductItem[]>(
  "products/filterProductsByCategory",
  async (categoryId, thunkAPI) => {
    try {
      const response = await axios(
        `${BASE_URL}/products/?categoryId=${categoryId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [] as ProductItem[],
    filtered: [] as ProductItem[],
    related: [] as ProductItem[],
    isLoading: false,
    error: false,
    sorted: [] as ProductItem[],
  },
  reducers: {
    filteredByPrice: (state, { payload }) => {
      state.filtered = state.list.filter(({ price }) => price < payload);
    },
    sortByPrice: (
      state,
      action: PayloadAction<{ price_min: number; price_max: number }>
    ) => {
      const { price_min, price_max } = action.payload;

      const sortedProducts: ProductItem[] = state.list.filter(
        ({ price }) => price >= price_min && price <= price_max
      );
      sortedProducts.sort((a, b) => a.price - b.price);

      state.sorted = sortedProducts;
    },
    getRelatedProducts: (state, { payload }) => {
      const list = state.list.filter(({ category: { id } }) => id === payload);
      state.related = shuffle(list);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(createProductAsync.fulfilled, (state, { payload }) => {
      state.list.push(payload);
      state.isLoading = false;
    });
    builder.addCase(createProductAsync.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(
      filterProductsByCategory.fulfilled,
      (state, { payload }) => {
        state.list = payload;
      }
    );
    builder.addCase(filterProductsByCategory.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(deleteProductAsync.fulfilled, (state, { payload }) => {
      state.isLoading = true;
      state.list = state.list.filter((product) => product.id !== payload);
      state.isLoading = false;
    });
    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      state.error = true;
      state.isLoading = false;
    });
  },
});

export const selectSortedProducts = createSelector(
  (state: RootState) => state.products.sorted,
  (sortedProducts: ProductItem[]) => sortedProducts
);

export const { filteredByPrice, getRelatedProducts, sortByPrice } =
  productsSlice.actions;
export default productsSlice.reducer;
