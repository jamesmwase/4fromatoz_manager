var S = require('string')
, chalk = require('chalk')
, bcrypt = require('bcryptjs')
;

// models
var User = require('../../models/user/user')
, Contact = require('../../models/user/contact')
, Password = require('../../models/user/password')


// setting up relations
User.hasMany(Contact, {as: 'Contacts', foreignKey: 'userId'})
Contact.belongsTo(User, {as: 'User', foreignKey: 'userId'})
User.hasMany(Password, {as: 'Passwords', foreignKey: 'userId'})
Password.belongsTo(User, {as: 'User', foreignKey: 'userId'})

exports.login = function (req, res, next) {
  res.render('auth/login/index')
}

exports.loginPOST = async function (req, res, next) {
	const contact = await Contact.findOne({
		where: { contact: req.body.contact, role: 'primary' }
	})

	if (!contact) {
		return res.status(200).json('wrong_credentials')
	}
  console.log(chalk.yellow(contact.dataValues));

  const password = await Password.findOne({
    where: { userId: contact.dataValues.userId }
  })

	const userData = await User.findOne({
		where: { id: contact.dataValues.userId }
		// , include: [{ model: Contact, as: 'Contacts' }]
	})
	console.log(chalk.yellow(password.password));
	if (bcrypt.compareSync(req.body.password, password.password) && userData.username === req.body.username) {
		// asigning results to express session middleware
		req.session.user = userData.dataValues;
    req.user = req.session.user;
		console.log(req.user);
		req.session.authenticated = true;
		console.log(chalk.green(req.user));
		res.status(200).json('success');
	}
	else {
		res.status(200).json('wrong_credentials');
	}
}
exports.logout = function (req, res, next) {
  req.session.user = {};
  res.redirect('/login')
}
