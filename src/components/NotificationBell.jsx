import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, Gavel, UserPlus, Info } from "lucide-react";
import { useMarket } from "../context/MarketContext";

const META = {
  bid:    { icon: Gavel,    tone: "bg-purple/20 text-[#a78bfa]",       to: "/bids" },
  follow: { icon: UserPlus, tone: "bg-green-500/20 text-green-400",    to: "/profile" },
  status: { icon: Info,     tone: "bg-yellow-500/20 text-yellow-400",  to: "/bids" },
};

export default function NotificationBell() {
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useMarket();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

   useEffect(() => {
    if (!open) return;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openItem = (n) => {
    markNotificationRead(n.id);
    setOpen(false);
    navigate(META[n.type].to);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`relative -mx-2 grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/10 active:scale-90 ${open ? "bg-white/10" : ""}`}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-red px-1 text-[10px] font-semibold leading-none">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <motion.div
          role="dialog"
          aria-label="Notifications"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-x-3 top-[92px] z-50 overflow-hidden rounded-[16px] border border-white/10 bg-panel shadow-2xl md:absolute md:inset-x-auto md:right-0 md:top-full md:mt-3 md:w-[380px]"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h2 className="text-[15px] font-semibold">
              Notifications
              {unreadCount > 0 && <span className="ml-2 rounded-full bg-red px-2 py-0.5 text-[11px]">{unreadCount} new</span>}
            </h2>
            <button
              onClick={markAllNotificationsRead}
              disabled={unreadCount === 0}
              className="text-[12px] font-medium text-[#a78bfa] hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
            >
              Mark all as read
            </button>
          </div>

          {notifications.length === 0 ? (
            <p className="px-4 py-10 text-center text-[14px] muted">You're all caught up.</p>
          ) : (
            <ul className="max-h-[360px] divide-y divide-white/5 overflow-y-auto">
              {notifications.map((n) => {
                const { icon: Icon, tone } = META[n.type];
                return (
                  <li key={n.id}>
                    <button
                      onClick={() => openItem(n)}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-white/5 ${n.read ? "" : "bg-purple/10"}`}
                    >
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${tone}`}><Icon size={17} /></span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-[13px] leading-snug ${n.read ? "text-[#b9b5cf]" : "font-medium text-white"}`}>{n.text}</span>
                        <span className="mt-0.5 block text-[12px] muted">{n.time}</span>
                      </span>
                      {!n.read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-purple" aria-label="Unread" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>
      )}
    </div>
  );
}
