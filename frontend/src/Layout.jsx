import React from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop.jsx";
import NavBar from "./frontend/Home/NavBar.jsx";
import Footer from "./frontend/Home/Footer.jsx";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
