import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop.jsx";
import NavBar from "./frontend/Home/NavBar.jsx";
import Footer from "./frontend/Home/Footer.jsx";
import AuthNotification from "./Components/AuthNotification.jsx";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <NavBar />
      <AuthNotification />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { borderRadius: "999px", fontWeight: 700, fontSize: "12px" },
        }}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
