import { createBrowserRouter, } from "react-router-dom";
import { Cart, ForgotPasswordPage, HomePage, OrderSuccess, PageNotFoundPage, PaymentFailed, PaymentSuccess, ResetPasswordPage, SignInPage, SignUpPage } from "../pages";
import { ProductOverview, ProductSection } from "../components";
import { PublicLayout } from "../layouts";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: ':id',
                element: <ProductSection />
            },
            {
                path: ':id/:id',
                element: <ProductOverview />
            },
            {
                path: "sign-in",
                element: <SignInPage />
            },
            {
                path: "sign-up",
                element: <SignUpPage />
            },
            {
                path: "forgot-password",
                element: <ForgotPasswordPage />
            },
            {
                path: "reset-password/:id/:token",
                element: <ResetPasswordPage />
            },
            {
                path: "cart",
                element: <Cart />
            },


            {
                path: "payment-success",
                element: <PaymentSuccess />
            },
            {
                path: "payment-failed",
                element: <PaymentFailed />
            },
            {
                path: "order-success",
                element: <OrderSuccess />
            },
        ]
    },
    {
        path: '*',
        element: <PageNotFoundPage />
    }
]);

export default router;