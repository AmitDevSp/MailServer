import { createTransport, SendMailOptions } from 'nodemailer';


export interface EmailData {
    from: string;
    to: string;
    cc?: string;
    bcc?: string;
    subject: string;
    text?: string;
    html?: string;
    attachments?: any;
}


export class EmailSender {
    private smtpHost: string;
    private smtpPort: number;

    constructor(smtpHost: string, smtpPort: number) {
        this.smtpHost = smtpHost;
        this.smtpPort = smtpPort;
    }


    public sendEmail(emailData: SendMailOptions): void {

        var transporter = createTransport({
            host: this.smtpHost,
            port: this.smtpPort,
            secure: false
        });

        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log('Server is ready to take our messages');
            }
        });


        transporter.sendMail(emailData, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }

}