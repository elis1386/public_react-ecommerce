import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { CategoryItem } from "../types/Category";

import { BASE_URL } from "../utils/constants";


export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios(`${BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: 'Request failed with status code 500' });
    }
  }
);


const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [] as CategoryItem[],
    isLoading: false,
    error: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});
const categoryReducer= categoriesSlice.reducer;
export default categoryReducer
