import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense } from "react";
import "./index.css";
import Layout from "./Layout.jsx";
import App from "./App.jsx";
import Shop from "./frontend/Shop/shop.jsx";
import PreviewCard from "./frontend/Shop/Previewcard.jsx";
import AboutUs from "./frontend/AboutUs/about.jsx";
import ContactUs from "./frontend/ContactUs/contact.jsx";
import SignIn from "./frontend/SignIn/Signin.jsx";
import SignUp from "./frontend/SignUp/Signup.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Forgotpassword from "./frontend/Forgotpassword/forgot.jsx";
import ResetPassword from "./frontend/ResetPassword/reset.jsx";
import Dashboard from "./frontend/Dashboard/dashboard.jsx";
import Settings from "./frontend/Dashboard/settings.jsx";
import Orderlist from "./frontend/Dashboard/orderlist.jsx";
import Favorites from "./frontend/Dashboard/favorites.jsx";
import Cart from "./frontend/Cart/cart.jsx";
import Shipping from "./frontend/Cart/shipping.jsx";
import RefundPolicy from "./frontend/RefundPolicy/refund.jsx";
import Terms from "./frontend/Terms/terms.jsx";
import PrivacyPolicy from "./frontend/PrivacyPolicy/privacy.jsx";
import TrackOrder from "./frontend/Trackorder/trackorder.jsx";
import Payment from "./frontend/Cart/payment.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import AdminRoute from "./Components/AdminRoute.jsx";
import AdminDashboard from "./frontend/Admin/AdminDashboard.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div> Loading ... </div>}>
            <App />
          </Suspense>
        ),
      },
      {
        path: "/shop",
        element: (
          <Suspense fallback={<div> Loading ... </div>}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<div> Loading ... </div>}>
            <PreviewCard />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<div> Loading ... </div>}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<div> Loading ... </div>}>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "/signin",
        element: (
          <Suspense fallback={<div> Loading ... </div>}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<div> Loading ... </div>}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "/forgotpassword",
        element: (
          <Suspense fallback={<div> Loading ... </div>}>
            <Forgotpassword />
          </Suspense>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <Suspense fallback={<div> Loading ... </div>}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div> Loading ... </div>}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div> Loading ... </div>}>
              <Settings />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div> Loading ... </div>}>
              <Orderlist />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/favorites",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div> Loading ... </div>}>
              <Favorites />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div> Loading ... </div>}>
              <Cart />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/shipping",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div> Loading ... </div>}>
              <Shipping />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/refund",
        element: (
          <Suspense fallback={<div> Loading ... </div>}>
            <RefundPolicy />
          </Suspense>
        ),
      },
      {
        path: "/terms",
        element: (
          <Suspense fallback={<div> Loading ... </div>}>
            <Terms />
          </Suspense>
        ),
      },
      {
        path: "/privacy",
        element: (
          <Suspense fallback={<div> Loading ... </div>}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: "/trackorder",
        element: (
          <Suspense fallback={<div> Loading ... </div>}>
            <TrackOrder />
          </Suspense>
        ),
      },
      {
        path: "/payment",
        element: (
          <Suspense fallback={<div> Loading ... </div>}>
            <Payment />
          </Suspense>
        ),
      },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <Suspense fallback={<div> Loading ... </div>}>
              <AdminDashboard />
            </Suspense>
          </AdminRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
