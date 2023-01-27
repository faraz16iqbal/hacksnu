import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@g.com",
    password: bcrypt.hashSync("12345", 10),
    warehouses: [],
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@g.com",
    password: bcrypt.hashSync("12345", 10),
    warehouses: [],
  },
  {
    name: "Jane Doe",
    email: "faraz@g.com",
    password: bcrypt.hashSync("12345", 10),
    warehouses: [],
  },
];

export default users;
