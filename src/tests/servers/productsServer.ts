import { rest } from "msw";
import { setupServer } from "msw/node";
import { CreateProduct, ProductItem } from "../../types/Product";
import productsData from "../data/productData";
import categoriesData from "../data/categoriesData";

export const handlers = [
  rest.delete(
    "https://api.escuelajs.co/api/v1/products/:id",
    async (req, res, ctx) => {
      const { id } = req.params;
      if (productsData.find((product) => product.id === Number(id))) {
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ),

  rest.post(
    "https://api.escuelajs.co/api/v1/products",
    async (req, res, ctx) => {
      const input: CreateProduct = await req.json();
      const category = categoriesData.find(
        (category: { id: number }) => category.id === input.categoryId
      );
      if (category) {
        const newProduct: ProductItem = {
          id: productsData.length + 1,
          title: input.title,
          price: input.price,
          description: input.description,
          images: "",
          category: category,
        };
        return res(ctx.json(newProduct));
      } else {
        ctx.status(400);
        return res(
          ctx.json({
            message: [
              "price must be a positive number",
              "images must contain at least 1 element",
              "each value in images must be a URL address",
              "images must be an array",
            ],
            error: "Bad Request",
            statusCode: 400,
          })
        );
      }
    }
  ),
  rest.put(
    "https://api.escuelajs.co/api/v1/products",
    async (req, res, ctx) => {
      const input: Partial<ProductItem> = await req.json();
      const { id } = req.params;
      const index = productsData.findIndex(
        (p: { id: number }) => p.id === Number(id)
      );
      try {
        if (index > -1) {
          return res(
            ctx.json({
              ...productsData[index],
              ...input,
            })
          );
        } else {
          ctx.status(400);
          return res(
            ctx.json({
              message: [
                "price must be a positive number",
                "images must contain at least 1 element",
                "each value in images must be a URL address",
                "images must be an array",
              ],
              error: "Bad Request",
              statusCode: 400,
            })
          );
        }
      } catch (e) {
        console.log("Error happened in PUT request");
      }
    }
  ),
];

const productsServer = setupServer(...handlers);

export default productsServer;
