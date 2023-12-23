const express = require("express");
 const controllers =require("../controllers/productController");
 const isValidId = require("../middlewares/isValidId")
 const router = express.Router();
 router.get("./products",controllers.getAllProducts);
 router.get("/products/:productId",isValidId,controllers.getOneProduct);
 router.post("/products",controllers.addProduct);
 router.delete("/products/:productId",isValidId,controllers.deleteProduct);
 router.put("/products/:productId",isValidId,controllers.updateProduct);

 module.exports = router;