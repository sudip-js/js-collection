
import dotenv from "dotenv";
dotenv.config({ path: '.env' });

export const {
    PORT,
    CLIENT_BASE_URL,
    STRIPE_SECRET_KEY,
    DB_URL,
    GMAIL_APP_EMAIL,
    GMAIL_APP_PASSWORD,
    JWT_SECRET
} = process.env;