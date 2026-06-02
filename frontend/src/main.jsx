import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./index.css";
import Layout from "./Layout.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import AdminRoute from "./Components/AdminRoute.jsx";

// Eagerly load the home page (it's what visitors see first)
import App from "./App.jsx";

// Every other route is lazy-loaded — its JS is only downloaded when navigated to
const Shop            = lazy(() => import("./frontend/Shop/shop.jsx"));
const PreviewCard     = lazy(() => import("./frontend/Shop/Previewcard.jsx"));
const AboutUs         = lazy(() => import("./frontend/AboutUs/about.jsx"));
const ContactUs       = lazy(() => import("./frontend/ContactUs/contact.jsx"));
const Blog            = lazy(() => import("./frontend/Blog/Blog.jsx"));
const BlogPost        = lazy(() => import("./frontend/Blog/BlogPost.jsx"));
const NotFound        = lazy(() => import("./frontend/NotFound.jsx"));
const SignIn          = lazy(() => import("./frontend/SignIn/Signin.jsx"));
const SignUp          = lazy(() => import("./frontend/SignUp/Signup.jsx"));
const Forgotpassword  = lazy(() => import("./frontend/Forgotpassword/forgot.jsx"));
const ResetPassword   = lazy(() => import("./frontend/ResetPassword/reset.jsx"));
const Dashboard       = lazy(() => import("./frontend/Dashboard/dashboard.jsx"));
const Settings        = lazy(() => import("./frontend/Dashboard/settings.jsx"));
const Orderlist       = lazy(() => import("./frontend/Dashboard/orderlist.jsx"));
const Favorites       = lazy(() => import("./frontend/Dashboard/favorites.jsx"));
const Cart            = lazy(() => import("./frontend/Cart/cart.jsx"));
const Shipping        = lazy(() => import("./frontend/Cart/shipping.jsx"));
const Payment         = lazy(() => import("./frontend/Cart/payment.jsx"));
const RefundPolicy    = lazy(() => import("./frontend/RefundPolicy/refund.jsx"));
const Terms           = lazy(() => import("./frontend/Terms/terms.jsx"));
const PrivacyPolicy   = lazy(() => import("./frontend/PrivacyPolicy/privacy.jsx"));
const TrackOrder      = lazy(() => import("./frontend/Trackorder/trackorder.jsx"));
const AdminDashboard  = lazy(() => import("./frontend/Admin/AdminDashboard.jsx"));
const GoogleAuthLayout = lazy(() => import("./GoogleAuthLayout.jsx"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-4 border-[#4a703f] border-t-transparent animate-spin" />
  </div>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/",            element: <App /> },
      { path: "/shop",        element: <Suspense fallback={<PageLoader />}><Shop /></Suspense> },
      { path: "/product/:slug", element: <Suspense fallback={<PageLoader />}><PreviewCard /></Suspense> },
      { path: "/about",       element: <Suspense fallback={<PageLoader />}><AboutUs /></Suspense> },
      { path: "/contact",     element: <Suspense fallback={<PageLoader />}><ContactUs /></Suspense> },
      { path: "/blog",        element: <Suspense fallback={<PageLoader />}><Blog /></Suspense> },
      { path: "/blog/:slug",  element: <Suspense fallback={<PageLoader />}><BlogPost /></Suspense> },
      { path: "/signin",      element: <Suspense fallback={<PageLoader />}><GoogleAuthLayout><SignIn /></GoogleAuthLayout></Suspense> },
      { path: "/signup",      element: <Suspense fallback={<PageLoader />}><GoogleAuthLayout><SignUp /></GoogleAuthLayout></Suspense> },
      { path: "/forgotpassword", element: <Suspense fallback={<PageLoader />}><Forgotpassword /></Suspense> },
      { path: "/reset-password", element: <Suspense fallback={<PageLoader />}><ResetPassword /></Suspense> },
      { path: "/refund",      element: <Suspense fallback={<PageLoader />}><RefundPolicy /></Suspense> },
      { path: "/terms",       element: <Suspense fallback={<PageLoader />}><Terms /></Suspense> },
      { path: "/privacy",     element: <Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense> },
      { path: "/trackorder",  element: <Suspense fallback={<PageLoader />}><TrackOrder /></Suspense> },
      {
        path: "/dashboard",
        element: <ProtectedRoute><Suspense fallback={<PageLoader />}><Dashboard /></Suspense></ProtectedRoute>,
      },
      {
        path: "/settings",
        element: <ProtectedRoute><Suspense fallback={<PageLoader />}><Settings /></Suspense></ProtectedRoute>,
      },
      {
        path: "/orders",
        element: <ProtectedRoute><Suspense fallback={<PageLoader />}><Orderlist /></Suspense></ProtectedRoute>,
      },
      {
        path: "/favorites",
        element: <ProtectedRoute><Suspense fallback={<PageLoader />}><Favorites /></Suspense></ProtectedRoute>,
      },
      {
        path: "/cart",
        element: <ProtectedRoute><Suspense fallback={<PageLoader />}><Cart /></Suspense></ProtectedRoute>,
      },
      {
        path: "/shipping",
        element: <ProtectedRoute><Suspense fallback={<PageLoader />}><Shipping /></Suspense></ProtectedRoute>,
      },
      {
        path: "/payment",
        element: <ProtectedRoute><Suspense fallback={<PageLoader />}><Payment /></Suspense></ProtectedRoute>,
      },
      {
        path: "/admin",
        element: <AdminRoute><Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense></AdminRoute>,
      },
      // 404 catch-all — must be last
      {
        path: "*",
        element: <Suspense fallback={<PageLoader />}><NotFound /></Suspense>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
