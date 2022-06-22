import { Router } from "express";
import nodemailer from "nodemailer";
import open from "open";

const router = Router();

router.post("/api/email", (req, res) => {
    const output = `
    <h2>To: ${req.body.to}</h2>
    <p>Subject: ${req.body.subject}</p>
    <h3>Message:</h3>
    <p>${req.body.message}</p>
    <br>
    <h3>From:</h3>
    <ul>
        <li>${req.body.name}</li>
        <li>${req.body.department}</li>
        <li>${req.body.phone}</li>
    </ul>
    
    `

    async function main() {
        let testAccount = await nodemailer.createTestAccount();
      
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
      
        let info = await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: req.body.to, // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.message, // plain text body
          html: output // html body
        });
      
      
        open(nodemailer.getTestMessageUrl(info));
        res.redirect("/");
      }
      main().catch(console.error);
    
});

export default router;