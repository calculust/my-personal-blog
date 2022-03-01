import dotenv from 'dotenv';

dotenv.config();

export const sqlConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
}

export const stripeConfig = {
    secret: process.env.STRIPE_SECRET
}

export const mailgunConfig = {
    apiKey: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    toEmail: process.env.MAILGUN_TO_EMAIL
}

export const jwtConfig = {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE
}