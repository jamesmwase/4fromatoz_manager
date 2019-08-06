const S = require('string')
, chalk = require('chalk')
;

// models
const User = require('../../models/user/user')
, ArticleCategory = require('../../models/article/article_categories')

// error handler controller
const errHandler = require('../../controllers/error_handler');

exports.list = async function (req, res, next) {
  const categories = await ArticleCategory.findAll().catch(errHandler);
  res.render('article_crud/categories/list/index', {
    title: 'Category Manager - Articles'
    , categories: categories
  })
}
exports.addCategoryGET = async function (req, res, next) {
  res.render('article_crud/categories/create/index', {
    title: 'Add new category - Articles'
  });
}
exports.addCategoryPOST = async function (req, res, next) {
  var categoryName = S(req.body.category).trim().toString()
  const category = await ArticleCategory.findOne({
    where: {
			category: categoryName
		}
	}).catch(errHandler);
	if (!category) {
    var newCategory = {
      userId: req.session.user.id
      , category: categoryName
    }
		const createCategory = await ArticleCategory.create(newCategory).catch(errHandler);
		res.status(200).json('New Category has been successfully added!');
	}
	else if (category) {
		res.json('Category already exists in db!');
	}
}
exports.editGET = async function (req, res, next) {
  const category = await ArticleCategory.findOne({
    where: { id: req.params.id }
  }).catch(errHandler)
  res.render('article_crud/categories/edit/index', {
    title: 'Edit category - Articles'
    , category: category
  })
}
exports.editPOST = async function (req, res, next) {
  var categoryName = S(req.body.category).trim().toString()
  const category = await ArticleCategory.findOne({
    where: { id: req.params.id }
  }).catch(errHandler)

  if (category && categoryName !== category.category) {
    const updateCategory = category.update({
      category: categoryName
    }).catch(errHandler)
    res.status(200).json('Category has been updated!')
  }
  else {
    res.json('You can not update category with same category name.')
  }
}
exports.delete = async function (req, res, next) {
  const deleteCategory = await ArticleCategory.destroy({
    where: { id: req.params.id }
  }).catch(errHandler)
  res.json('Category name has been successfully deleted!')
}
