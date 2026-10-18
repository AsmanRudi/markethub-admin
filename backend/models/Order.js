const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const orderSchema = new mongoose.Schema(
    {
        or_id: {
            type: String,
            default: () => randomUUID(),
            unique: true,
            immutable: true,
        },
        or_pd_id: { type: String, required: true, index: true },
        or_amount: { type: Number, required: true, min: 1 },
    },
    {
        timestamps: {
            createdAt: "or_created_at",
            updateAt: "or_update_at",
        },
    }
);

module.exports = mongoose.model("Order", orderSchema, "orders");