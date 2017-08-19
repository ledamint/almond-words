const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'checkingwords@gmail.com',
    pass: 'margin01020',
  },
});

const sendMail = (emailTo, subject, text, reject, resolve) => {
  const mailOptions = {
    from: 'checkingwords@gmail.com',
    to: emailTo,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      reject();
    } else {
      resolve();
    }
  });
};

module.exports = sendMail;
