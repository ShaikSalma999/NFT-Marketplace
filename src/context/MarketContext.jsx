import { createContext, useContext, useRef, useState } from "react";
import {
  nftImages,
  bids as bidSeed,
  creators as homeCreators,
  profileCreators,
  activities as activitySeed,
} from "../data";
import { formatEth } from "../utils/format";

const CARD_STEP = 0.01; 
const ROW_STEP = 0.0025; 
const round = (n) => Math.round(n * 10000) / 10000;

const NOTIF_SEED = [
  { id: 1, type: "bid", text: "Aria Voss placed a bid of 0.12 ETH on Liquid Wave", time: "2 min ago", read: true },
  { id: 2, type: "follow", text: "Kenji Ito started following you", time: "1 hour ago", read: true },
  { id: 3, type: "status", text: "Auction for “Brighten LQ” ends in 3 hours", time: "3 hours ago", read: true },
  { id: 4, type: "follow", text: "Sofia Lund started following you", time: "Yesterday", read: true },
  { id: 5, type: "status", text: "Your bid on Liquid Wave was outbid", time: "2 days ago", read: true },
];

const MarketContext = createContext(null);

export function MarketProvider({ children }) {
  
  const [followed, setFollowed] = useState(profileCreators.map((c) => c.id));

  const [cards, setCards] = useState(() => [
    { id: "featured", bid: 0.05, bidCount: 0, placed: false },
    ...nftImages.map((_, i) => ({ id: i + 1, bid: 0.05, bidCount: 0, placed: false })),
  ]);
  const [selectedCard, setSelectedCard] = useState(null);

 
  const [rows, setRows] = useState(() =>
    bidSeed.map((r, i) => ({
      ...r, id: i + 1, offer: 0.0025, recent: 0.0025, bidCount: 0, placed: false,
    }))
  );
  const [selectedRows, setSelectedRows] = useState([]);

  const [bidsPlaced, setBidsPlaced] = useState(0);
  const [bidVolume, setBidVolume] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [activities, setActivities] = useState(() =>
    activitySeed.map((text) => ({ text, time: "12 mins ago" }))
  );

  
  const [notifications, setNotifications] = useState(NOTIF_SEED);
  const notifId = useRef(100);
  const notify = (type, text) => {
    const id = notifId.current++;
    setNotifications((n) => [{ id, type, text, time: "Just now", read: false }, ...n].slice(0, 30));
  };
  const markNotificationRead = (id) =>
    setNotifications((n) => n.map((x) => (x.id === id ? { ...x, read: true } : x)));
  const markAllNotificationsRead = () =>
    setNotifications((n) => n.map((x) => ({ ...x, read: true })));
  const unreadCount = notifications.filter((n) => !n.read).length;

  const addActivity = (text) =>
    setActivities((a) => [{ text, time: "Just now" }, ...a].slice(0, 20));

  
  const allCreators = [...homeCreators, ...profileCreators];
  const toggleFollow = (id) => {
    const creator = allCreators.find((c) => c.id === id);
    if (!followed.includes(id)) {
      addActivity(`You started following ${creator?.name ?? "a creator"}`);
      notify("follow", `You started following ${creator?.name ?? "a creator"}`);
    }
    setFollowed((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  };
  const followingList = allCreators.filter((c) => followed.includes(c.id));

  const selectCard = (id) => setSelectedCard((s) => (s === id ? null : id));
  const placeCardBid = (id) => {
    const card = cards.find((c) => c.id === id);
    if (!card || card.placed) return;
    const next = round(card.bid + CARD_STEP);
    setSelectedCard(id);
    setCards((cs) =>
      cs.map((c) => (c.id === id ? { ...c, bid: next, bidCount: c.bidCount + 1, placed: true } : c))
    );
    setBidsPlaced((n) => n + 1);
    setBidVolume((v) => round(v + next));
    addActivity(`You placed a bid of ${formatEth(next)}`);
    notify("bid", `Your bid of ${formatEth(next)} was placed on ${id === "featured" ? "Brighten LQ" : "Liquid Wave"}`);
  };

 
  const toggleRow = (id) =>
    setSelectedRows((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleAllRows = () =>
    setSelectedRows((s) => (s.length === rows.length ? [] : rows.map((r) => r.id)));
  const removeRow = (id) => {
    const row = rows.find((r) => r.id === id);
    if (row) notify("status", `Your bid on ${row.title} was cancelled`);
    setRows((rs) => rs.filter((r) => r.id !== id));
    setSelectedRows((s) => s.filter((x) => x !== id));
    setCancelled((c) => c + 1);
  };
  const placeRowBids = () => {
    const targets = rows.filter((r) => selectedRows.includes(r.id) && !r.placed);
    if (!targets.length) return;
    const ids = targets.map((r) => r.id);
    const volume = targets.reduce((sum, r) => sum + round(r.offer + ROW_STEP), 0);
    setRows((rs) =>
      rs.map((r) => {
        if (!ids.includes(r.id)) return r;
        const next = round(r.offer + ROW_STEP);
        return { ...r, offer: next, recent: next, bidCount: r.bidCount + 1, placed: true };
      })
    );
    setBidsPlaced((n) => n + targets.length);
    setBidVolume((v) => round(v + volume));
    addActivity(
      targets.length === 1
        ? `You placed a bid of ${formatEth(round(targets[0].offer + ROW_STEP))}`
        : `You placed ${targets.length} bids`
    );
    notify(
      "bid",
      targets.length === 1 ? `Your bid on ${targets[0].title} was placed` : `${targets.length} bids were placed successfully`
    );
  };

  const value = {
    
    followed, followingList, toggleFollow,
   
    cards, selectedCard, selectCard, placeCardBid,
   
    rows, selectedRows, toggleRow, toggleAllRows, removeRow, placeRowBids,
   
    notifications, unreadCount, markNotificationRead, markAllNotificationsRead,
  
    bidsPlaced, bidVolume,
    auctions: 89 + bidsPlaced,        
    bidAuctions: 82000 + bidsPlaced,  
    cancelledCount: 89 + cancelled,   
    activities,
  };

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}

export function useMarket() {
  const ctx = useContext(MarketContext);
  if (!ctx) throw new Error("useMarket must be used inside <MarketProvider>");
  return ctx;
}
