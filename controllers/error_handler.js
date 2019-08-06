const nodemailer = require('nodemailer')
, chalk = require('chalk')
;

const errHandler = err => {
	console.error(chalk.yellow('Error: ', err));
	/*let transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'blueknife9@gmail.com',
	    pass: 'knifeblue+8'
	  }
	});
	let mailOptions = {
	  from: 'blueknife9@gmail.com',
	  to: 'em.j1@protonmail.com',
	  subject: 'An error occured at allfrombasic.com',
	  html: `<h1 style="color: #900;">Error @allfrombasic.com</h1><p>` + err + `</p>`
	};*/
}

module.exports = errHandler;
