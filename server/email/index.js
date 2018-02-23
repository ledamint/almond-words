const nodemailer = require('nodemailer');

const passwords = require('../../passwords');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'almondwords@gmail.com',
    pass: passwords.email,
  },
});

const sendMail = (emailTo, subject, text) => {
  const mailOptions = {
    from: 'AlmondWords',
    to: emailTo,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject();
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = sendMail;
