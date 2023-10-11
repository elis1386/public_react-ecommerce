import cartReducer, {
  addItemToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../store/cartSlice";
import { cartData } from "../data/cartData";
import categoriesData from "../data/categoriesData";
describe("Test cartReducer normal action", () => {
  test("Should add new product to cart", () => {
    const newItem = {
      id: 3,
      title: "New Product",
      price: 123,
      category: categoriesData[0],
      images: "",
      description: "New product description",
      quantity: 1,
    };

    const cart = cartReducer(cartData, addItemToCart(newItem));
    expect(cart.length).toBe(3); 
  });
  test("Should not add but increase the same product in the cart", () => {
    const cart = cartReducer(cartData, addItemToCart(cartData[1]));
    expect(cart.length).toBe(2);
    expect(cart[1].quantity).toBe(4);
  });
  test("Should increase product quantity", () => {
    const cart = cartReducer(cartData, increaseQuantity(1));
    expect(cart[0].quantity).toBe(2);
  });
  test("Should decrease product quantity", () => {
    const cart = cartReducer(cartData, decreaseQuantity(2));
    expect(cart[1].quantity).toBe(1);
  });
  test("Should remove when quantity is 0", () => {
    const cart = cartReducer(cartData, decreaseQuantity(1));
    expect(cart.length).toBe(1);
  });
  test("Should remove product from cart", () => {
    const cart = cartReducer(cartData, removeFromCart(2));
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(1);
  });
});
