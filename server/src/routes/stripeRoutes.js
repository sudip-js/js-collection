import express from "express";
import { createPaymentIntent } from "../controllers/stripe/stripeController.js";

const router = express.Router();

router.post('/create-checkout-session', createPaymentIntent);

export default router;