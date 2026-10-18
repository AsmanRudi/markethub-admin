const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Order = require("./models/Order");

async function addUsers() {
  const password = await bcrypt.hash("UserDemo123!", 12);

  const users = [
    {
      us_name: "Andi Pratama",
      us_password: password,
      us_email: "andi@example.com",
      us_phone_number: "081234567801",
      us_address: "Padang, Sumatera Barat",
    },
    {
      us_name: "Siti Rahma",
      us_password: password,
      us_email: "siti@example.com",
      us_phone_number: "081234567802",
      us_address: "Bungus, Padang",
    },
  ];

  for (const user of users) {
    await User.updateOne(
      { us_email: user.us_email },
      { $setOnInsert: user },
      { upsert: true }
    );
  }

  return User.countDocuments();
}

async function addCategories() {
  const categories = [
    { ct_code: "CT-001", ct_name: "Elektronik" },
    { ct_code: "CT-002", ct_name: "Aksesori" },
    { ct_code: "CT-003", ct_name: "Gaming" },
  ];

  for (const category of categories) {
    await Category.updateOne(
      { ct_code: category.ct_code },
      { $setOnInsert: category },
      { upsert: true }
    );
  }

  return Category.find();
}

async function addProducts() {
  const categories = await addCategories();

  const gaming = categories.find((c) => c.ct_code === "CT-003");
  const electronics = categories.find((c) => c.ct_code === "CT-001");

  const products = [
    {
      pd_code: "PD-001",
      pd_ct_id: gaming.ct_id,
      pd_name: "Controller Wireless",
      pd_price: 350000,
    },
    {
      pd_code: "PD-002",
      pd_ct_id: electronics.ct_id,
      pd_name: "Headset Gaming",
      pd_price: 275000,
    },
  ];

  for (const product of products) {
    await Product.updateOne(
      { pd_code: product.pd_code },
      { $setOnInsert: product },
      { upsert: true }
    );
  }

  return Product.countDocuments();
}

async function addOrders() {
  await addProducts();

  const products = await Product.find();
  const demoOrders = products.slice(0, 2).map((product) => ({
    or_pd_id: product.pd_id,
    or_amount: 2,
  }));

  for (const order of demoOrders) {
    await Order.updateOne(
      {
        or_pd_id: order.or_pd_id,
        or_amount: order.or_amount,
      },
      { $setOnInsert: order },
      { upsert: true }
    );
  }

  return Order.countDocuments();
}

module.exports = {
  addUsers,
  addCategories,
  addProducts,
  addOrders,
};