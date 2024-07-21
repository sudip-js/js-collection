import Stripe from 'stripe';
import { CLIENT_BASE_URL, STRIPE_SECRET_KEY } from "../../config/index.js";
const stripe = Stripe(STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item?.title,
                        },
                        unit_amount: item?.discounted_price * 100,
                    },
                    quantity: item.cartQuantity,
                }
            }),
            success_url: `${CLIENT_BASE_URL}/payment-success`,
            cancel_url: `${CLIENT_BASE_URL}/payment-failed`,
        })
        res.json({ success: true, url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}




