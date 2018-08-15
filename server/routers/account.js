const router = require('express').Router();
router.get('/register', function(req, res, next) {
  res.status(200);
  res.send('Test');
});

module.exports  = router;
