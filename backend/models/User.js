const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const userSchema = new mongoose.Schema(
    {
        us_id: {
            type: String,
            default: () => randomUUID(),
            unique: true,
            immutable: true,
        },
        us_name: { type: String, required: true, trim: true },
        us_password: { type: String, required: true, select: false },
        us_email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        us_phone_number: { type: String, default: "" },
        us_address: { type: String, default: "" },
    },
    {
        timestamp: {
            createdAt: "us_created_at",
            updateAt: "us_update_at"
        },
    }
);

module.exports = mongoose.model("User", userSchema, "users");