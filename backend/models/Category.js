const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const categorySchema = new mongoose.Schema(
    {
        ct_id: {
            type: String,
            default: () => randomUUID(),
            unique: true,
            immutable: true,
        },
        ct_code: { type: String, required: true, unique: true, trim: true },
        ct_name: { type: String, required: true, trim: true },
    },
    {
        timestamps: {
            createdAt: "ct_created_at",
            updateAt: "ct_update_at",
        },
    }
);

const Category = mongoose.model(
  "Category",
  categorySchema,
  "categories"
);

module.exports = Category;