require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MarketHub API is running",
  });
});

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/users", authMiddleware, require("./routes/userRoutes"));
app.use("/api/products", authMiddleware, require("./routes/productRoutes"));
app.use("/api/categories", authMiddleware, require("./routes/categoryRoutes"));
app.use("/api/orders", authMiddleware, require("./routes/orderRoutes"));
app.use("/api/dummy", authMiddleware, require("./routes/dummyRoutes"));

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`MarketHub API: http://localhost:${PORT}`);
  });
}

startServer();