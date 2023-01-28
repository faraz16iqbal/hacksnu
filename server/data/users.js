import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    warehouses: [],
    isAdmin: true,
  },
  {
    name: "Amazon",
    email: "a@amazon.com",
    password: bcrypt.hashSync("12345", 10),
    warehouses: [],
  },
  {
    name: "Flipkart",
    email: "f@flipkart.com",
    password: bcrypt.hashSync("12345", 10),
    warehouses: [],
  },
  {
    name: "Sneapdeal",
    email: "mail@sneapdeal.com",
    password: bcrypt.hashSync("12345", 10),
    warehouses: [],
  },
  {
    name: "Shein",
    email: "mail@shein.com",
    password: bcrypt.hashSync("12345", 10),
    warehouses: [],
  },
  {
    name: "JustDial",
    email: "mail@justdial.com",
    password: bcrypt.hashSync("12345", 10),
    warehouses: [],
  },
  {
    name: "Ajio",
    email: "mail@ajio.com",
    password: bcrypt.hashSync("12345", 10),
    warehouses: [],
  },
];

export default users;
