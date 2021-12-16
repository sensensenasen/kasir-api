var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const { Op } = require("sequelize");

const { Products } = require("../models");
const path = require("path");
//Upload image middleware
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads');
    },
  filename: function (req, file, cb) {
      cb(null, 'prd-' + Date.now() + path.extname(file.originalname));
  }
});
const uploadImg = multer({storage: storage}).single('productImage');
var fs = require('fs');

/* GET PRODUCT LIST */
/* http://localhost:3001/products/ */
router.get("/", async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Endpoint to get all products'
  const products = await Products.findAll();
  res.status(200).json(products);
});

/* GET PRODUCT LIST */
/* http://localhost:3001/products/barcode/ */
router.get("/barcode/:barcode", async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Endpoint to get a specific product by barcode.'
  const { barcode } = req.params;
  const prod = await Products.findOne({
    where: {
      productCode: barcode,
    },
  });
  if(!prod){
    return res.status(400).json({ message: "product not found" });
  }
  res.status(200).json(prod);
});

/* REGISTERING NEW PRODUCT */
/* http://localhost:3001/products/ */
router.post("/", async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Endpoint to add new product'
  /*    #swagger.parameters['obj'] = {
                  in: 'body',
                  description: 'Adding new product.',
                  schema: { $ref: '#/definitions/Product' }
          } */
  const schema = {
    productName: "string",
    productVendor: "string",
    productCode: "string",
    productDescription: "string",
    productImage: "string|optional",
    quantityInStock: "number",
    price: "number",
    promoId: "number|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const checkProduct = await Products.findAll({
    where: {
      productCode: req.body.productCode,
    },
  });
  if (checkProduct.length) {
    return res.status(400).json({ message: "PRODUCT CODE IS ALREADY IN DATABASE" });
  }

  const product = await Products.create(req.body);
  res.status(200).json(product);
});

/* http://localhost:3001/products/uploads */
router.post("/uploads", uploadImg, async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Endpoint to uploads product image'
  const { id, prevProductImage } = req.body;
  const { size, mimetype, filename, path } = req.file;
  let product = await Products.findByPk(id);
  if (!product) {
    return res.status(400).json({ message: "id product not found" });
  }
  if(prevProductImage){
    try{
      fs.unlinkSync('./' + prevProductImage)
    } catch(err){
      console.log(err)
    }
  }
  

  const update = {
    productImage: path
  }
  const updProduct = await product.update(update);
  res.status(200).json(updProduct);
})

/* UPDATE PRODUCT BY ID */
/* http://localhost:3001/product/id/2 */
router.put("/id/:id", async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Endpoint to update product'
  const id = req.params.id;
  let product = await Products.findByPk(id);
  if (!product) {
    return res.status(400).json({ message: "id product not found" });
  }

  const updProduct = await product.update(req.body);
  res.status(200).json(updProduct);
});

/* DELETE PRODUCT BY ID */
/* http://localhost:3001/products/id/3 */
router.delete("/id/:id", async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Endpoint to delete product'
  const { id } = req.params;
  let product = await Products.findByPk(id);
  if (!product) {
    return res.status(400).json({ message: "id product not found" });
  }

  await product.destroy();
  res.status(200).json({ message: "product deleted" });
});

module.exports = router;
