const router = require('express').Router();
const Category = require('../models/category');

router.route('/categories')
  .get((req, res, next) => {
    let categories = Category.find({}, (err, categories) => {
      res.json({
        success: true,
        categories: categories,
        message: 'Successfully'
      });
    });

  })
  .post((req, res, next) => {
    let category = new Category();
    category.name = req.body.name;
    category.save();
    res.json({
      success: true,
      category: category,
      message: 'Category created successfully!'
    });
  });

module.exports = router;
