import { FileChartColumn, WalletCards } from "lucide-react";
import PageIntro from "../components/PageIntro";
import StatCard from "../components/StatCard";
import Checkbox from "../components/Checkbox";
import { useMarket } from "../context/MarketContext";
import { formatCompact, formatEth } from "../utils/format";
import Avatar from "../components/Avatar";

const COLS = "grid-cols-[60px_2.2fr_1fr_1fr_1.3fr_1.2fr_40px]";

export default function Bids() {
  const { rows, selectedRows, toggleRow, toggleAllRows, placeRowBids, removeRow, bidAuctions, cancelledCount } = useMarket();
  const selected = rows.filter(r => selectedRows.includes(r.id));
  const allPlaced = selected.length > 0 && selected.every(r => r.placed);
  const allSelected = rows.length > 0 && selectedRows.length === rows.length;

  return <>
    <PageIntro title="Bids" subtitle="Welcome Bids Page"/>
    <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-4">
      <StatCard value="24K" label="Artworks" icon={FileChartColumn}/>
      <StatCard value={formatCompact(bidAuctions)} label="Auction" icon={WalletCards} tone="green"/>
      <StatCard value="200" label="Creators" icon={FileChartColumn} tone="yellow"/>
      <StatCard value={cancelledCount} label="Cancelled" icon={FileChartColumn} tone="red"/>
    </div>

    <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
      <h2 className="text-[23px] font-semibold">Active Bids</h2>
      <button
        onClick={placeRowBids}
        disabled={selected.length === 0 || allPlaced}
        title={selected.length === 0 ? "Select an item first" : undefined}
        className={`h-[40px] rounded-[9px] px-8 font-semibold transition active:scale-[.98] disabled:cursor-not-allowed ${
          allPlaced ? "bg-[#45c91e]" : "bg-purple hover:bg-[#805cf6] disabled:opacity-50 disabled:hover:bg-purple"
        }`}
      >
        {allPlaced ? "Bid Placed" : "Place a Bid"}
      </button>
    </div>

   
    <div className="mt-8 hidden overflow-x-auto lg:block">
      <div className="min-w-[950px]">
        <div className={`grid ${COLS} items-center border-b border-white/10 pb-4 text-[14px] font-semibold`}>
          <span className="pl-3"><Checkbox checked={allSelected} onChange={toggleAllRows} label="Select all"/></span><span>Item List</span><span>Open Price</span><span>Your Offer</span><span>Recent Offer</span><span>Time Left</span><span>Action</span>
        </div>
        <div className="space-y-5 pt-7">
          {rows.map(r=><div key={r.id} className={`grid ${COLS} items-center rounded-[17px] bg-panel px-3 py-3 text-[14px] ring-1 transition ${selectedRows.includes(r.id) ? "ring-purple" : "ring-transparent"}`}>
            <span><Checkbox checked={selectedRows.includes(r.id)} onChange={()=>toggleRow(r.id)} label={`Select ${r.title}`}/></span>
            <div className="flex items-center gap-3"><img src={r.art} className="h-11 w-[63px] rounded-full object-cover"/><div><b>{r.title}</b><p className="flex items-center gap-1.5"><Avatar src="/assets/papaya-avatar.jpg" className="h-4 w-4"/>John Abraham · {r.bidCount} {r.bidCount === 1 ? "bid" : "bids"}</p></div></div>
            <span>0.0025 ETH</span>
            <span>{formatEth(r.offer)}{r.placed && <span className="block text-[12px] text-[#45c91e]">Bid Placed</span>}</span>
            <span className="flex items-center gap-2"><Avatar src="/assets/bid-avatar.jpg" className="h-11 w-11"/><span>{formatEth(r.recent)}</span></span>
            <span>2 Hours 1 min 30s</span>
            <button onClick={()=>removeRow(r.id)} aria-label={`Remove ${r.title}`} className="text-xl">×</button>
          </div>)}
        </div>
      </div>
    </div>

    
    <div className="mt-6 space-y-4 lg:hidden">
      {rows.length > 0 && (
        <label className="flex items-center gap-3 text-[14px]">
          <Checkbox checked={allSelected} onChange={toggleAllRows} label="Select all"/> Select all
        </label>
      )}
      {rows.map(r=><div key={r.id} className={`rounded-[17px] bg-panel p-4 text-[14px] ring-1 transition ${selectedRows.includes(r.id) ? "ring-purple" : "ring-transparent"}`}>
        <div className="flex items-center gap-3">
          <Checkbox checked={selectedRows.includes(r.id)} onChange={()=>toggleRow(r.id)} label={`Select ${r.title}`}/>
          <img src={r.art} className="h-11 w-[63px] rounded-full object-cover"/>
          <div className="min-w-0 flex-1"><b>{r.title}</b><p className="flex items-center gap-1.5"><Avatar src="/assets/papaya-avatar.jpg" className="h-4 w-4"/>John Abraham · {r.bidCount} {r.bidCount === 1 ? "bid" : "bids"}</p></div>
          <button onClick={()=>removeRow(r.id)} aria-label={`Remove ${r.title}`} className="text-2xl leading-none">×</button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div><p className="text-[12px] muted">Open Price</p>0.0025 ETH</div>
          <div><p className="text-[12px] muted">Your Offer</p>{formatEth(r.offer)}{r.placed && <span className="block text-[12px] text-[#45c91e]">Bid Placed</span>}</div>
          <div><p className="text-[12px] muted">Recent Offer</p><span className="flex items-center gap-2"><Avatar src="/assets/bid-avatar.jpg" className="h-6 w-6"/>{formatEth(r.recent)}</span></div>
          <div><p className="text-[12px] muted">Time Left</p>2 Hours 1 min 30s</div>
        </div>
      </div>)}
    </div>
    {rows.length === 0 && <p className="mt-10 text-center muted">No active bids.</p>}
  </>;
}
