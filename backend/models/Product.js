const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const productSchema = new mongoose.Schema(
    {
        pd_id: {
            type: String,
            default: () => randomUUID(),
            unique: true,
            immutable: true,
        },
        pd_code: { type: String, required: true, unique: true, trim: true },
        pd_ct_id: { type: String, required: true, index: true },
        pd_name: { type: String, required: true, trim: true },
        pd_price: { type: Number, required: true, min: 0 },
    },
    {
        timestamp: {
            createdAt:  "pd_created_at",
            updateAt: "pd_updated_at",
        },
    }
);

module.exports = mongoose.model("Product", productSchema, "products");