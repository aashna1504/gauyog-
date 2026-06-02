import React from "react"; // eslint-disable-line no-unused-vars
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop.jsx";
import NavBar from "./frontend/Home/NavBar.jsx";
import Footer from "./frontend/Home/Footer.jsx";
import AuthNotification from "./Components/AuthNotification.jsx";
import { motion } from "framer-motion";
const WHATSAPP_NUMBER = "917984997996";
const WHATSAPP_MESSAGE = "Hi! I need help with my order.";

const WhatsAppButton = () => {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      
      // Floating Animation
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      
      // Hover effects
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      
      className="fixed bottom-8 right-8 z-[9999] bg-[#25D366] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 group"
    >
      {/* Animated Rings (Pulse Effect) */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none" />
      <span className="absolute inset-[-4px] rounded-full border-2 border-[#25D366] opacity-20 animate-pulse" />

      {/* WhatsApp SVG Icon */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-9 h-9 fill-white relative z-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.49 2.027 7.8L0 32l8.418-2.004A15.934 15.934 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.77-1.852l-.485-.287-5.003 1.192 1.23-4.875-.317-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.862c-.398-.199-2.355-1.162-2.72-1.295-.365-.133-.631-.199-.897.199-.266.398-1.03 1.295-1.263 1.561-.232.266-.465.299-.863.1-.398-.199-1.68-.619-3.2-1.975-1.183-1.055-1.982-2.358-2.214-2.756-.232-.398-.025-.613.174-.811.18-.178.398-.465.597-.697.199-.232.266-.398.398-.664.133-.266.066-.498-.033-.697-.1-.199-.897-2.16-1.229-2.958-.324-.776-.653-.671-.897-.683l-.764-.013c-.266 0-.697.1-1.063.498-.365.398-1.395 1.362-1.395 3.323s1.428 3.855 1.628 4.121c.199.266 2.81 4.29 6.808 6.018.951.41 1.693.655 2.272.839.955.304 1.824.261 2.511.158.766-.114 2.355-.963 2.688-1.893.333-.93.333-1.727.232-1.893-.1-.166-.365-.266-.763-.465z" />
      </motion.svg>
    </motion.a>
  );
};

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
          style: {
            borderRadius: "999px",
            fontWeight: 700,
            fontSize: "12px",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
          },
          success: {
            style: {
              background: "#4a703f",
              color: "#ffffff",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#4a703f",
            },
          },
          error: {
            style: {
              background: "#744926",
              color: "#ffffff",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#744926",
            },
          },
        }}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
