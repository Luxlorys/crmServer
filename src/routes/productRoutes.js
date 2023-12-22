const express = require("express");
 const controllers =require("../controllers/productController");
 const router = express.Router();
 router.get("./products",controllers.getAllProducts);
 router.get("/products/:productId",controllers.getOneProduct);
 router.post("/products",controllers.addProduct);
 router.delete("/products/:productId",controllers.deleteProduct);
 router.put("/products/:productId",controllers.updateProduct);

 module.exports = router;