import { Router } from "express";
import nodemailer from "nodemailer";
import open from "open";

const router = Router();

router.post("/api/email", (req, res) => {
    const output = `
    <h2>To: ${req.body.to}</h2>
    <p>Subject: ${req.body.subject}</p>
    <h3>From:</h3>
    <ul>
        <li>${req.body.name}</li>
        <li>${req.body.company}</li>
        <li>${req.body.phone}</li>
    </ul>
    <h3>Message:</h3>
    <p>${req.body.message}</p>
    `

    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
      
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: req.body.to, // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.message, // plain text body
          html: output // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        open(nodemailer.getTestMessageUrl(info));
        res.redirect("/");
      }
      main().catch(console.error);
    
});





export default router;