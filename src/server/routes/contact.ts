import express from 'express';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import { mailgunConfig } from '../config';

const mailgun = new Mailgun(FormData).client({
    username: 'api',
    key: mailgunConfig.apiKey
});

let router = express.Router();

router.post('/', async (req, res) => {
    const newEmail = req.body;
    try {
        const result = await mailgun.messages.create(mailgunConfig.domain, {
            to: mailgunConfig.toEmail,
            subject: 'Contact Form Submission',
            from: `${newEmail.nameField} <${newEmail.email}>`,
            text: newEmail.content
        });
       res.json(result)
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'server error, check the logs' });
    }
});

export default router;