const errHandler = require('../controllers/error_handler');

exports.index = function (req, res, next) {
  res.render('index/index')
}
