import config from "../config/index.js";
import transporter from "../config/transporter.config";

const mailHelper = async (option) => {

    const message = {
        from: config.SMTP_SENDER_EMAIL, // sender address
        to: option.email, // list of receivers
        subject: option.subject, // Subject line
        text: option.message, // plain text body
        // html: "<b>Hello world?</b>", // html body
    };

    await transporter.sendMail(message)
}

export default mailHelper