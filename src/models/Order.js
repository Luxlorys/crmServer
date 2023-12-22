const { Schema, model } = require("mongoose");

const orderStatuses = ["in progress", "completed", "canceled"];

const orderSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "customer",
    },
    status: {
      type: String,
      default: "in progress",
      enum: orderStatuses,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    price: {
      type: Number,
      default: 0,
    },
    comments: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Order = model("order", orderSchema);

module.exports = Order;
