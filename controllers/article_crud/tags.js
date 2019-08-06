var S = require('string')
, chalk = require('chalk')
;

// models
var User = require('../../models/user/user')
, ArticleTag = require('../../models/article/article_tags')
, ArticleCategory = require('../../models/article/article_categories')

/*
 * Error handler
 */
const errHandler = err => {
	console.error(chalk.yellow('Error: ', err));
}

exports.list = async function (req, res, next) {
  const tags = await ArticleTag.findAll().catch(errHandler);
  res.render('article_crud/tags/list/index', {
    title: 'Tag Manager - Articles'
    , tags: tags
  })
}
exports.addTagGET = async function (req, res, next) {
  const categories = await ArticleCategory.findAll().catch(errHandler)
  res.render('article_crud/tags/create/index', {
    title: 'Add new tag - Articles'
    , categories: categories
  });
}
exports.addTagPOST = async function (req, res, next) {
  var tagName = S(req.body.tag).trim().toString()
  const tag = await ArticleTag.findOne({
    where: {
			tag: tagName
		}
	}).catch(errHandler);
	if (!tag) {
    var newTag = {
      userId: req.session.user.id
      , tag: tagName
      , category: S(req.body.category).trim().toString()
    }
		const createTag = await ArticleTag.create(newTag).catch(errHandler);
		res.status(200).json('New Tag has been successfully added!');
	}
	else if (tag) {
		res.json('Tag already exists in db');
	}
}
exports.editGET = async function (req, res, next) {
  const tag = await ArticleTag.findOne({
    where: { id: req.params.id }
  }).catch(errHandler)
  res.render('article_crud/tags/edit/index', {
    title: 'Edit tag - Articles'
    , tag: tag
  })
}
exports.editPOST = async function (req, res, next) {
  var tagName = S(req.body.tag).trim().toString();
  const tag = await ArticleTag.findOne({
    where: { id: req.params.id }
  }).catch(errHandler)

  if (tag && tagName !== tag.tag) {
    const updateCategory = tag.update({
      tag: tagName
    }).catch(errHandler);
    res.status(200).json('Category has been updated!')
  }
  else {
    res.json('You can not update tag with same tag name.')
  }
}
exports.delete = async function (req, res, next) {
  const deleteCategory = await ArticleTag.destroy({
    where: { id: req.params.id }
  }).catch(errHandler)
  res.json('Tag name has been successfully deleted!')
}
