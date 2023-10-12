import { UserShema } from "../../types/User";

const usersData: UserShema[] = [
  {
    id: 1,
    name: "Alex",
    email: "alex@gmail.com",
    password: "Alex1234",
    role: "customer",
    avatar:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3",
  },
  {
    id: 2,
    name: "Admin",
    email: "admin@mail.com",
    password: "admin123",
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3",
  },
];

export default usersData;
