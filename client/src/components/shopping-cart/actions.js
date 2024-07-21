import { apiClient } from "../../services/apis";
import { ROUTES } from "./routes";

export const stripeCreateCheckoutSession = (payload) => {
    return apiClient({
        method: ROUTES.STRIPE_CREATE_CHECKOUT_SESSION.METHOD,
        url: ROUTES.STRIPE_CREATE_CHECKOUT_SESSION.URL,
        data: payload,
    });
};