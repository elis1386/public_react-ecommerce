import { ProductItem } from "../../types/Product";

const productsData: ProductItem[] = [
  {
    id: 1,
    title: "Handcrafted Plastic Keyboard",
    price: 943,
    description: "The Football Is Good For Training And Recreational Purposes",
    images: "https://i.imgur.com/00qWleT.jpeg",
    category: {
      id: 5,
      name: "Test category",
      image: "https://i.imgur.com/rDC2jWQ.jpeg",
    },
  },
  {
    id: 2,
    title: "Oriental Bronze Gloves",
    price: 139,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    images: "https://i.imgur.com/G45P8tI.jpeg",
    category: {
      id: 5,
      name: "Test category",
      image: "https://i.imgur.com/rDC2jWQ.jpeg",
    },
  },
  {
    id: 3,
    title: "Generic Fresh Cheese",
    price: 98,
    description: "A description of bicycle",
    images: "https://i.imgur.com/fpT4052.jpeg,",
    category: {
      id: 3,
      name: "Test category",
      image: "https://picsum.photos/640/640?r=1389",
    },
  },
];

export default productsData;
