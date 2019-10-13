var express = require('express');
var router = express.Router();

// Controllers
var indexController = require('../controllers/index');
var authLogController = require('../controllers/auth/log');
var authCreateController = require('../controllers/auth/create')
, crudController = require('../controllers/article_crud/manage')
, tagsController = require('../controllers/article_crud/tags')
, categoriesController = require('../controllers/article_crud/categories')
;

// ensure that the user is authenticated
function ensureAuthenticated (req, res, next) {
	if (req.session && req.session.authenticated) {
		return next();
	}
	else {
		return res.status(401).redirect('/login');
	}
}

/* GET home page. */
router.get('/', ensureAuthenticated, indexController.index)
router.get('/login', authLogController.login);
router.post('/login', authLogController.loginPOST);

router.get('/logout', ensureAuthenticated, authLogController.logout);

/**
 * Restriction needed when creating account.. needs attention asap!
 */
router.get('/create_account', authCreateController.create)
router.post('/create_account', authCreateController.createUserPOST)

// write article
router.get('/articles/write', ensureAuthenticated, crudController.writeArticleGet)
router.post('/articles/write/save', ensureAuthenticated, crudController.writeArticlePOST)
router.get('/articles/write/get_tags_on/:categoryName', ensureAuthenticated, crudController.getTags)

router.get('/articles/view_list', ensureAuthenticated, crudController.listArticles)
router.get('/articles/edit/:urlId', ensureAuthenticated, crudController.editGET)
router.post('/articles/edit/:urlId', ensureAuthenticated, crudController.editPOST)
router.get('/articles/delete/:urlId', ensureAuthenticated, crudController.delete)

router.get('/articles/tags/list', ensureAuthenticated, tagsController.list);
router.get('/articles/tags/add', ensureAuthenticated, tagsController.addTagGET);
router.post('/articles/tags/add', ensureAuthenticated, tagsController.addTagPOST);
router.get('/articles/tags/edit/:id', ensureAuthenticated, tagsController.editGET);
router.post('/articles/tags/edit/:id', ensureAuthenticated, tagsController.editPOST);
router.get('/articles/tags/delete:id', ensureAuthenticated, tagsController.delete);

router.get('/articles/category/list', ensureAuthenticated, categoriesController.list);
router.get('/articles/category/add', ensureAuthenticated, categoriesController.addCategoryGET);
router.post('/articles/category/add', ensureAuthenticated, categoriesController.addCategoryPOST);
router.get('/articles/category/edit/:id', ensureAuthenticated, categoriesController.editGET);
router.post('/articles/category/edit/:id', ensureAuthenticated, categoriesController.editPOST);
router.get('/articles/category/delete/:id', ensureAuthenticated, categoriesController.delete);

module.exports = router;
