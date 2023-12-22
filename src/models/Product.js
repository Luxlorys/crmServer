const { Schema, model } = require("mongoose");
const productShema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    price: {
        type:Number,
        min:0,
        require:true
    },
    description:{
        type:String
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
    
  },
  { versionKey: false }
);
const Products = model("product", productShema);
//Функцию нужно вынести в helpers
const handleMongooseError=(error,data,next)=>{
    error.status=400;
    next()
}
productShema.post("save",handleMongooseError);

module.exports = Products;
