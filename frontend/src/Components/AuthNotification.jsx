import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, LogOut, UserPlus, X } from "lucide-react";
import useNotificationStore from "../store/notificationStore";

const CONFIGS = {
  login: {
    icon: <CheckCircle size={20} />,
    gradient: "from-[#166534] to-[#22c55e]",
    label: "Signed In",
  },
  signup: {
    icon: <UserPlus size={20} />,
    gradient: "from-[#166534] to-[#22c55e]",
    label: "Welcome Aboard",
  },
  logout: {
    icon: <LogOut size={20} />,
    gradient: "from-[#7f1d1d] to-[#dc2626]",
    label: "Signed Out",
  },
  cart_add: {
    icon: <CheckCircle size={20} />,
    gradient: "from-[#166534] to-[#22c55e]",
    label: "Added To Cart",
  },
  cart_remove: {
    icon: <LogOut size={20} />,
    gradient: "from-[#7f1d1d] to-[#dc2626]",
    label: "Removed From Cart",
  },
  wishlist_add: {
    icon: <CheckCircle size={20} />,
    gradient: "from-[#166534] to-[#22c55e]",
    label: "Added To Wishlist",
  },
  wishlist_remove: {
    icon: <LogOut size={20} />,
    gradient: "from-[#7f1d1d] to-[#dc2626]",
    label: "Removed From Wishlist",
  },
  wishlist_auth: {
    icon: <LogOut size={20} />,
    gradient: "from-[#7f1d1d] to-[#dc2626]",
    label: "Sign In Required",
  },
};

export default function AuthNotification() {
  const { notification, hide } = useNotificationStore();
  const cfg = notification
    ? (CONFIGS[notification.type] ?? CONFIGS.login)
    : null;

  return (
    <AnimatePresence>
      {notification && cfg && (
        <motion.div
          key={notification.type + notification.message}
          initial={{ opacity: 0, y: -24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -18, scale: 0.94 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="fixed top-24 right-4 md:right-6 z-[999] w-[calc(100%-2rem)] max-w-[400px] pointer-events-auto"
        >
          <div
            className={`bg-gradient-to-br ${cfg.gradient} rounded-[22px] p-4 shadow-2xl shadow-black/25 text-white flex items-start gap-3 relative overflow-hidden`}
          >
          
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3.8, ease: "linear" }}
              className="absolute bottom-0 left-0 h-[3px] bg-white/30 w-full origin-left rounded-full"
            />

           
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
              {cfg.icon}
            </div>

           
            <div className="flex-1 pt-0.5 min-w-0">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-75 mb-0.5">
                {cfg.label}
              </p>
              <p className="text-sm font-bold leading-snug">
                {notification.message}
              </p>
            </div>

            <button
              onClick={hide}
              className="opacity-60 hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
