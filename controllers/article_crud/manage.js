const S = require('string')
, chalk = require('chalk')
, HTTP = require('machinepack-http')
, Jimp = require('jimp')
, fs = require('fs')
;

// models
const User = require('../../models/user/user')
, Contact = require('../../models/user/contact')
, Password = require('../../models/user/password')
, Article = require('../../models/article/article')
, ArticleCategory = require('../../models/article/article_categories')
, ArticleTag = require('../../models/article/article_tags')
, ArticleImage = require('../../models/article/article_image')
, ArticleInfos = require('../../models/article/article_infos')
;

// Error handler
const errHandler = require('../../controllers/error_handler');

// dompurify for escaping dirty HTML

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

const allowed_tags = ['a', 'b', 'i', 'q', 'img', 'blockqoute', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul', 'li', 'pre', 'code','textarea']

exports.writeArticleGet = async function (req, res, next) {
  const categories = await ArticleCategory.findAll().catch(errHandler);
  res.render('article_crud/write/index', {
    title: 'Write an article - Articles Manager'
    , categories: categories
  })
}
exports.getTags = async function (req, res, next) {
	console.log(req.params.categoryName);
  const tags = await ArticleTag.findAll({
    where: { category: req.params.categoryName }
  }).catch(errHandler);
  res.status(200).json(tags)
}
exports.writeArticlePOST = async function (req, res, next) {
	// generating random string characters
	let randomChars = Math.random().toString(36).substring(3);
	var body, suspiciousTags, htmlTagMatching, tag_matches, attr_matches, i;
	function cleanArticleBody () {
		if (req.body.hasCode == 1) {
			body = S(DOMPurify.sanitize(req.body.body)).escapeHTML().toString();
			return body;
		} else {
			body = S(DOMPurify.sanitize(req.body.body, {ALLOWED_TAGS: allowed_tags, KEEP_CONTENT: true})).escapeHTML().toString();
      		return body;
		}
	}

	var articleContent = {
		title: S(DOMPurify.sanitize(req.body.title, {ALLOWED_TAGS: []})).trim().toString()
		, urlId: S(DOMPurify.sanitize(req.body.title, {ALLOWED_TAGS: []})).trim().replaceAll(' ', '_').s
		, intro: S(DOMPurify.sanitize(req.body.intro, {ALLOWED_TAGS: []})).trim().toString()
		, body: cleanArticleBody()
		, author: req.session.user.id
		, metaDescription: S(DOMPurify.sanitize(req.body.metaDescription, {ALLOWED_TAGS: []})).trim().toString()
		, category: S(DOMPurify.sanitize(req.body.category, {ALLOWED_TAGS: []})).trim().toString()
		, tags: S(DOMPurify.sanitize(req.body.tags, {ALLOWED_TAGS: []})).trim().toString()
		, visible: S(DOMPurify.sanitize(req.body.visible, {ALLOWED_TAGS: []})).trim().toString()
		, hasCode: S(DOMPurify.sanitize(req.body.hasCode, {ALLOWED_TAGS: []})).trim().toString()
		, tutorialId: 0
	}
	const article = await Article.create(articleContent).catch(errHandler);
	articleContent.articleId = article.id;
	const article_infos = await ArticleInfos.create(articleContent).catch(errHandler);
	console.log(chalk.yellow(article.body));
	console.log(chalk.cyan(article_infos));
	if (parseInt(articleContent.visible, 10) === 1) {
		/*
		 * Send POST request of article's url to allfrombasic.com so it can be saved in sitemap.xml file
		 */
		const sendLink = await HTTP.post({
			url: '/add_link_to_sitemap',
			data: {url: 'http://www.4fromatoz.com/posts/'+articleContent.urlId},
			headers: {},
			baseUrl: '167.71.100.227:80',
		}).catch(errHandler);
	}
	if (req.files) {
		/*
		 * Manipulating image file if image file was uploaded and cancle request if file of other type was uploaded
		 */
		var fileName = req.files.new_upload.name
		, fileExtension = S(req.files.new_upload.mimetype).between('/').s
		, fileCategory = S(req.files.new_upload.mimetype).between('', '/').s
		;

		if (fileCategory !== 'image') {
			res.send('You can only Upload Images')
		}
		else {
			var x = function() {
				if (fileCategory === 'image') {
					return fileCategory;
				}
			}
			req.files.new_upload.mv('./public/uploads/' + x() + '/' + fileName, async function(err) {
				if (err) {
					console.log(err);
				}
			});
			/*
			 * Modify article's coverImg eg: reducing image quality and setting propper width and height
			 */
			const totalImages = await ArticleImage.count().catch(errHandler);
			function imageUrl () {
				let hostUrl = 'http://159.89.42.75/uploads/image/';
				return hostUrl + totalImages + '.jpg';
			}
			let originalDir = './public/uploads/' + x() + '/' + fileName
			, newDir = './public/uploads/' + x() + '/' + totalImages + '.jpg'
			;
			console.log(chalk.yellow('image count: ' + totalImages));
			let imageContent = {
				articleId: article.id
				, url: S(DOMPurify.sanitize(imageUrl(), {ALLOWED_TAGS: []})).trim().toString()
				, description: S(DOMPurify.sanitize(req.body.imageALT, {ALLOWED_TAGS: []})).trim().toString()
        		, tags: article_infos.tags
			}
			const image = await ArticleImage.create(imageContent).catch(errHandler)
			, readImg = await Jimp.read(originalDir).catch(errHandler)
			;
			readImg.resize(800, 500).quality(14).write(newDir);
			/*
			 * Delete original image
			 */
			fs.unlink(originalDir, function (err) {
				if (err) {console.log(err);}
				else{console.log('original file deleted!');}
			});
		}
	}
  res.status(200).json('Article Submited');
}

exports.listArticles = async function (req, res, next) {
  const articles = await Article.findAll().catch(errHandler);
  res.render('article_crud/list/index', {
    title: 'Articles List'
    , articles: articles
  })
}

exports.editGET = async function (req, res, next) {
  const article = await Article.findOne({
    where: { urlId: req.params.urlId }
  });
  res.render('article_crud/edit/index', {
    title: article.title
    , article: article
  });
}
exports.editPOST = async function (req, res, next) {
  // generating random string characters
	let randomChars = Math.random().toString(36).substring(3);
	var body, suspiciousTags, htmlTagMatching, tag_matches, attr_matches, i;
	function cleanArticleBody () {
		if (req.body.hasCode == 1) {
			body = S(DOMPurify.sanitize(req.body.body)).escapeHTML().toString();
			return body;
		} else {
			body = S(DOMPurify.sanitize(req.body.body, {ALLOWED_TAGS: allowed_tags, KEEP_CONTENT: true})).escapeHTML().toString();
			return body;
		}
	}
	var articleContent = {
		intro: S(DOMPurify.sanitize(req.body.intro, {ALLOWED_TAGS: []})).trim().toString()
		, body: cleanArticleBody()
		, hasCode: S(DOMPurify.sanitize(req.body.hasCode, {ALLOWED_TAGS: []})).trim().toString()
	}
	const article = await Article.findOne({
		where: { urlId: req.params.urlId }
	});
	const updatedArticle = await article.update(articleContent).catch(errHandler);
	res.status(200).redirect('/');
}
exports.delete = async function (req, res, next) {
  const deleteArticle = await Article.destroy({
    where: { urlId: req.params.urlId }
  });
  res.json('article deleted!');
}
