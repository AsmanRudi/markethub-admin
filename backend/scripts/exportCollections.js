require("dotenv").config();

const fs = require("fs/promises");
const path = require("path");
const mongoose = require("mongoose");

const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");

async function exportCollections() {
  await mongoose.connect(process.env.MONGODB_URI);

  const outputDir = path.resolve(__dirname, "../../exports");
  await fs.mkdir(outputDir, { recursive: true });

  const collections = [
    ["users.json", User],
    ["products.json", Product],
    ["categories.json", Category],
    ["orders.json", Order],
  ];

  try {
    for (const [filename, Model] of collections) {
      const documents = await Model.find().lean();

      await fs.writeFile(
        path.join(outputDir, filename),
        JSON.stringify(documents, null, 2),
        "utf8"
      );

      console.log(`Exported ${filename}: ${documents.length} documents`);
    }
  } finally {
    await mongoose.disconnect();
  }
}

exportCollections().catch((error) => {
  console.error("Export failed:", error);
  process.exitCode = 1;
});