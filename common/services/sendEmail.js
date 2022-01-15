const nodemailer = require('nodemailer');
const sendMail = async (from, passFrom, to, subject, html )=>{
    
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: from, // generated ethereal user
      pass: passFrom
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  try {
      
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"John Wick" <${from}>`, // sender address
    to: `${to.join(",")}`, // list of receivers
    subject: subject,
    html: html, // html body
  });

  console.log(info);
  return info;

  } catch (err) {
      return err;
  }

};

module.exports = sendMail;