const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config');

router.post('/login', function(req, res, next) {
  console.log(req);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      res.json({
        success: false,
        message: 'Not Authenticated'
      });
    } else {
      var validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        res.json({
          success: false,
          message: 'Invalid user or password'
        });
      } else {
        var token = jwt.sign({
          user: user
        }, config.secret, { expiresIn: '7d' });

        res.json({
          success: true,
          message: 'Authenticated',
          token: token
        });
      }
    }
  });
});

router.post('/signup', function(req, res, next) {
  let user = new User();
  user.email = req.body.email;
  user.name = req.body.name;
  user.password = req.body.password;
  user.picture = user.gravatar();
  user.isSeller = req.body.isSeller;

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (existingUser) {
      res.json({
        success: false,
        message: 'Account with that email exists'
      });
    } else {
      user.save();

      var token = jwt.sign({
        user: user
      }, config.secret, { expiresIn: '7d' });

      res.json({
        success: true,
        message: 'Token successfully created',
        token: token
      })
    }
  });
});
module.exports  = router;
