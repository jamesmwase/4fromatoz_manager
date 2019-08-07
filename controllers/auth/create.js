var S = require('string')
, chalk = require('chalk')
, bcrypt = require('bcryptjs')
, nodemailer = require('nodemailer')
;

// models
var User = require('../../models/user/user')
, Contact = require('../../models/user/contact')
, Password = require('../../models/user/password')
, ConfirmAccount = require('../../models/user/confirm_account')
;

// dompurify for escaping html and removing dirty HTML

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

exports.create = function (req, res, next) {
  res.render('auth/create/index')
}

exports.createUserPOST = async function (req, res, next) {
  let EmailAdress = S(DOMPurify.sanitize(req.body.contact, {ALLOWED_TAGS: []})).trim().toString();
	const contactExists = await Contact.findOne({
		where: {
			contact: EmailAdress
			, role: 'primary'
		}
	})
  var comfirmPassword = req.body.comfirmPassword;
  if (comfirmPassword !== req.body.password) {
    res.json('Your Password should match with the Comfirm Password field')
  }
	else if (!contactExists) {
		const hashedPassword = bcrypt.hashSync(req.body.password, 10);
		req.body.password = hashedPassword;
    var properDate = S(DOMPurify.sanitize(req.body.birthDate, {ALLOWED_TAGS: []})).trim().toString();
    var birthDate = new Date(properDate);
    let randomChars = Math.random().toString(36).substring(2);
    var newUser = {
      birthDate: birthDate
      , fname: S(DOMPurify.sanitize(req.body.fname, {ALLOWED_TAGS: []})).trim().toString()
      , lname: S(DOMPurify.sanitize(req.body.lname, {ALLOWED_TAGS: []})).trim().toString()
      , sex: S(DOMPurify.sanitize(req.body.sex, {ALLOWED_TAGS: []})).trim().toString()
      , contact: S(DOMPurify.sanitize(req.body.contact, {ALLOWED_TAGS: []})).trim().toString()
      , username: S(DOMPurify.sanitize(req.body.fname + '_' + randomChars, {ALLOWED_TAGS: []})).trim().toString()
    }
    console.log(chalk.yellow(req.body.birthDate + '\n' + newUser.birthDate + '\n' + newUser.username));
		const user = await User.create(newUser);

		var contactDetails = {
      userId: user.dataValues.id
      , contact: EmailAdress
      , category: 'email'
      , role: 'primary'
    }
    const contact = await Contact.create(contactDetails);

    var passwordDetails = { userId: user.dataValues.id, password: hashedPassword }
    const password = await Password.create(passwordDetails);
    /**
     * // for confirming account
     * let randomnumber = Math.floor(Math.random() * (90000000 -  + 10000000));
     * let confirmAccountDetails = { contactId: contact.id, activationKey: randomnumber }
     * const confirm_account = await ConfirmAccount.create(confirmAccountDetails)
     */
		res.status(200).json('success');
	}
	else {
		res.status(200).json('duplicate_email');
	}
}
