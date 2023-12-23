const { Schema, model } = require("mongoose");
const handleMongooseError=require("../../helpers");
const productShema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      require: true,
    },
    description: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);
const Products = model("product", productShema);

productShema.post("save", handleMongooseError);

module.exports = Products;
