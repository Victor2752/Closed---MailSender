import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mailAdapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "06036959a36c19",
        pass: "4369ea78e818d3"
    }
});

export class NodemailMailAdapater implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
        from: 'Equipe feedget <oi@feedget.com>',
        to: 'Victor puts<VictorBatata@gmail.com>',
        subject,
        html: body,
    });
    }
}