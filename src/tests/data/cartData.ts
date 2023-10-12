import { CartItem } from "../../types/CartItem";
import categoriesData from "./categoriesData";

export const cartData: CartItem[] = [
  {
    id: 1,
    title: "nuevo title",
    price: 987,
    category: categoriesData[1],
    images: "",
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four-wheel drive",
    quantity: 1,
  },
  {
    id: 2,
    title: "Bespoke Wooden Shirt",
    price: 551,
    category: categoriesData[0],
    images: "",
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four-wheel drive",
    quantity: 2,
  },
];
