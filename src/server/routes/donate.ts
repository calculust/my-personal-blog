import express from 'express';
import Stripe from 'stripe';
import { stripeConfig } from '../config';

const stripe = new Stripe(stripeConfig.secret, { apiVersion: '2020-08-27' });

let router = express.Router();

router.post('/', async (req, res) => {
    try {
        const paymentFulfilled = await stripe.paymentIntents.create({
            currency: 'usd',
            amount: req.body.amount * 100,
            confirm: true,
            payment_method: req.body.paymentMethod.id
        });
        res.json(paymentFulfilled);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'server error, check the logs' });
    }
});

export default router;