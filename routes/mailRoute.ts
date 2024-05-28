import * as express from 'express';
import dotenv from 'dotenv';
import {EmailSender} from '../helpers/mailHelper';
import {SendMailOptions} from 'nodemailer';
const log = require('../helpers/loggerHelper');

dotenv.config();
const port = process.env.SMTP_PORT;
const ip = process.env.SMTP_IP;
const MailRoutes = express.Router();

MailRoutes.post('/MailRoutes/SendMail', async (req: express.Request, res: express.Response) =>{
    log.http('Start /MailRoutes/SendMail');
    try{
        let FromAddress = req.body.FromAddress as string;
        let FromName = req.body.FromName as string;
        let ToAddress = req.body.ToAddress as string;
        let Cc = req.body.Cc as string;
        let Bcc = req.body.Bcc as string;
        let MailSubject = req.body.MailSubject as string;
        let MailBody = req.body.MailBody as string;

        const emailSender = new EmailSender(`${ip}`, Number(port));
        log.info(`EmailSender created with ip: $(ip) and port: $(port)`);

        const emailData: SendMailOptions = {
            from:{
                name: FromName,
                address: FromAddress
            },
            to: ToAddress,
            cc: Cc,
            bcc: Bcc,
            subject: MailSubject,
            html: MailBody
        };

        log.info(`emailData created with values\nfrom address: $(FromAddress)\nto address: $(ToAddress)\ncc: $(Cc)\nbcc: $(Bcc)\nmail subject: $(MailSubject)`);
        emailSender.sendEmail(emailData);
        log.info(`Email has been sent.`);

        const returnMessage = `/MailRoutes/SendMail finished.`;
        res.status(200).send(returnMessage);
        res.end();
    }
    catch(err){
        res.status(500);
        res.render('Error', {Error: err});
        log.error(`Error: /MailRoutes/SendMail\nError message: $(err.message)\nStack trace: $(err.stack)`);
    }
})

export {MailRoutes};