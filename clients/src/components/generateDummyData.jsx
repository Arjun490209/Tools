import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";

const generateUser = () => ({
  id: nanoid(),
  createdAt: new Date(),

  fullName: faker.person.fullName(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),

  email: faker.internet.email(),
  username: faker.internet.username(),

  mobile: faker.phone.number("+91 ##########"),
  gender: faker.person.sex(),
  age: faker.number.int({ min: 18, max: 60 }),

  address: {
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    pincode: faker.location.zipCode(),
  },

  images: {
    avatar: faker.image.avatar(),
    profile: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    cover: faker.image.urlPicsumPhotos({ width: 1200, height: 400 }),
  },

  isActive: faker.datatype.boolean(),
});

const generateProduct = () => ({
  id: nanoid(),
  createdAt: new Date(),

  name: faker.commerce.productName(),
  category: faker.commerce.department(),
  brand: faker.company.name(),

  price: faker.commerce.price({ min: 500, max: 50000 }),
  currency: "INR",
  stock: faker.number.int({ min: 0, max: 500 }),

  description: faker.commerce.productDescription(),

  images: {
    thumbnail: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    gallery: [
      faker.image.urlPicsumPhotos({ width: 600, height: 600 }),
      faker.image.urlPicsumPhotos({ width: 600, height: 600 }),
    ],
  },

  rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
  isAvailable: faker.datatype.boolean(),
});

const generatePayment = () => ({
  id: nanoid(),
  createdAt: new Date(),

  userId: nanoid(),
  orderId: nanoid(),

  amount: faker.number.int({ min: 100, max: 100000 }),
  currency: "INR",

  paymentMethod: faker.helpers.arrayElement([
    "UPI",
    "Credit Card",
    "Debit Card",
    "Net Banking",
    "Wallet",
  ]),

  status: faker.helpers.arrayElement(["success", "pending", "failed"]),

  transactionId: faker.finance.transactionType(),
  paidAt: faker.date.recent(),
});

const generateEmployee = () => ({
  id: nanoid(),
  createdAt: new Date(),

  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  mobile: faker.phone.number("+91 ##########"),

  department: faker.commerce.department(),
  designation: faker.person.jobTitle(),

  salary: faker.number.int({ min: 15000, max: 150000 }),
  experience: faker.number.int({ min: 0, max: 15 }),

  joiningDate: faker.date.past({ years: 10 }),

  address: {
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
  },

  isActive: faker.datatype.boolean(),
});

const generateDummyData = (type) => {
  switch (type) {
    case "users":
      return generateUser();
    case "products":
      return generateProduct();
    case "payment":
      return generatePayment();
    case "employees":
      return generateEmployee();
    default:
      return {};
  }
};

export default generateDummyData;
