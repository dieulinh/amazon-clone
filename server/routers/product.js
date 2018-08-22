const router = require('express').Router();
const Product = require('../models/product');
const config = require('../config/config');
const checkJWT = require('../middlewares/check-jwt');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new aws.S3({ accessKeyId: config.awsAccessKey, secretAccessKey: config.awsSecretAccessKey });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.bucketName,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldName });
    },
    key: function(req, file, cb) {
      cb(null, { fieldName: file.fieldName });
    }
  })
});

router.route('/products')
  .get()
  .post(checkJWT, (req, res, next) => {
    let product = new Product();
    product.owner = req.decoded.user._id;
    product.category = req.body.categoryId;
    product.description = req.body.description;
    product.price = req.body.price;
    product.image = req.file.location;
    product.title = req.body.title;
    product.save();
    res.json({
      success: true,
      product: product,
      message: 'Product created successfully!'
    });
  });

module.exports = router;
