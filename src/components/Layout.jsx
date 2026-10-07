import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Grid2X2, ClipboardList, Heart, Star, CircleUserRound, Settings,
  LogOut, Sun, Search, Hexagon
} from "lucide-react";
import { useState } from "react";
import NotificationBell from "./NotificationBell";
import Avatar from "./Avatar";

const nav = [
  { to: "/", icon: Grid2X2, label: "Home" },
  { to: "/bids", icon: ClipboardList, label: "Bids" },
  { to: "/saved", icon: Heart, label: "Saved" },
  { to: "/collections", icon: Star, label: "Collections" },
  { to: "/profile", icon: CircleUserRound, label: "Profile" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function Layout({ children }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const goHome = () => {
    setQuery("");
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-ink">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[80px] bg-[#191631] md:flex flex-col items-center py-7">
        <button onClick={goHome} aria-label="Go to Home" title="Home" className="grid h-[30px] w-[30px] place-items-center rounded-[6px] bg-purple text-white">
          <Hexagon size={21} strokeWidth={2.8}/>
        </button>
        <nav className="mt-10 flex flex-1 flex-col items-center gap-7">
          {nav.map(({to, icon: Icon, label}) => (
            <NavLink key={to} to={to} end={to === "/"} title={label}
              className={({isActive}) => `grid h-8 w-8 place-items-center transition ${isActive ? "text-purple" : "text-[#7a7890] hover:text-white"}`}>
              <Icon size={21} strokeWidth={1.7}/>
            </NavLink>
          ))}
        </nav>
        <button className="text-[#7a7890] hover:text-white"><LogOut size={20}/></button>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-30 h-[84px] bg-ink md:h-[108px] md:left-[80px]">
        <div className="flex h-full items-center justify-between px-5 md:pl-[38px] md:pr-[50px] xl:px-[70px]">
          <div className="relative w-[270px] max-w-[48vw] lg:w-[380px] lg:max-w-[55vw]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white" size={23}/>
            <input value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && navigate(`/?q=${encodeURIComponent(query)}`)}
              placeholder="Search Here"
              className="h-[51px] w-full rounded-[12px] bg-[#1c1937] pl-[58px] pr-4 text-[17px] text-white outline-none placeholder:text-[#6e6a83]"/>
          </div>
          <div className="flex items-center gap-6 md:gap-7">
            <Sun size={20} className="hidden text-white md:block"/>
            <NotificationBell/>
            <NavLink to="/profile" aria-label="Go to Profile" title="Profile"
              className={({isActive}) => `block h-11 w-11 shrink-0 rounded-full transition hover:ring-purple/70 active:scale-95 ${isActive ? "ring-2 ring-purple" : "ring-1 ring-white/20"}`}>
              <Avatar src="/assets/top-avatar.jpg" alt="John Smith" className="h-full w-full"/>
            </NavLink>
          </div>
        </div>
      </header>

      <main className="min-h-screen pt-[84px] md:ml-[80px] md:pt-[108px]">
        <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:.25}}
          className="mx-auto w-full max-w-[1370px] px-5 pb-24 md:pb-16 md:pl-[38px] md:pr-[50px] xl:px-[70px]">
          {children}
        </motion.div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[64px] items-center justify-around border-t border-white/5 bg-[#191631] md:hidden">
        {nav.map(({to, icon: Icon}) => (
          <NavLink key={to} to={to} end={to === "/"} className={({isActive}) => isActive ? "text-purple" : "text-[#7a7890]"}>
            <Icon size={21}/>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
