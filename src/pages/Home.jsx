import { FileChartColumn, WalletCards, UserRound, X } from "lucide-react";
import { nftImages, creators } from "../data";
import NFTCard from "../components/NFTCard";
import NFTGrid from "../components/NFTGrid";
import FollowButton from "../components/FollowButton";
import EthPriceChart from "../components/EthPriceChart";
import BidButton from "../components/BidButton";
import { useMarket } from "../context/MarketContext";
import { formatEth } from "../utils/format";
import StatCard from "../components/StatCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";

function Hero() {
  const navigate = useNavigate();
  const { cards, placeCardBid } = useMarket();
  const card = cards.find(c => c.id === "featured");
  return (
    <section className="grid gap-4 lg:grid-cols-[1.45fr_1.2fr]">
      <div className="relative min-h-[228px] overflow-hidden rounded-[20px] bg-cover bg-center p-5 sm:p-8"
        style={{backgroundImage:"linear-gradient(90deg,rgba(57,35,144,.35),rgba(91,39,191,.15)),url('/assets/hero-bg-clean.jpg')"}}>
        <div className="relative z-10 max-w-[560px]">
          <h1 className="text-[22px] font-semibold leading-[1.4] sm:text-[27px] md:text-[28px]">Discover, Collect, Sell<br/>and Create your NFT</h1>
          <p className="mt-2 text-[15px] text-[#d0cbe2]">Digital marketplace for crypto collectibles and non fungible tokens</p>
          <div className="mt-7 flex gap-3 sm:gap-5">
            <button onClick={() => navigate("/bids")} className="purple-btn h-[40px] flex-1 sm:w-[133px] sm:flex-none">Explore</button>
            <button className="red-btn h-[40px] flex-1 sm:w-[133px] sm:flex-none">Create</button>
          </div>
        </div>
      </div>
      <div className="surface flex min-h-[228px] flex-col gap-5 p-5 sm:flex-row">
        <img src="/assets/featured-nft.jpg" className="h-[188px] w-full rounded-[18px] sm:w-[44%] object-cover" />
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2">
            <Avatar src="/assets/papaya-avatar.jpg" className="h-8 w-8"/>
            <span className="text-sm font-semibold">John Abraham</span><span className="text-green-400">•</span>
          </div>
          <h3 className="mt-4 text-[18px] font-semibold">Brighten LQ</h3>
          <div className="mt-1 grid grid-cols-2 text-[14px]">
            <span>Auction time<br/><span className="muted">3h 1m 50s</span></span>
            <span>Current Bid : <span className="text-purple">{formatEth(card.bid)}</span><br/><span className="muted">0.15 ETH</span></span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-5 sm:mt-auto">
            <BidButton placed={card.placed} onClick={()=>placeCardBid("featured")} className="h-[40px]"/>
            <button className="red-btn h-[40px]">Details</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [tab, setTab] = useState("All");
  const { activities, auctions } = useMarket();
  return (
    <>
      <Hero/>
      <section className="mt-[68px]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[18px] font-semibold">Trending Bids</h2>
          <div className="flex gap-3 text-[14px]">
            {["All","Artwork","Book"].map(t => <button key={t} onClick={()=>setTab(t)} className={tab===t ? "rounded-full bg-purple px-4 py-0.5" : "px-1"}>{t}</button>)}
          </div>
        </div>
        <NFTGrid>
          {nftImages.map((img,i)=><NFTCard key={i} id={i+1} image={img}/>)}
        </NFTGrid>
      </section>
      <section id="home-scroll-stats" className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-[206px_minmax(0,1fr)_255px]">
        <div>
          <h2 className="mb-5 text-[18px] font-semibold">Trending Bids</h2>
          <div className="space-y-5">
            <StatCard value="24K" label="Artworks" change="+168.001%" icon={WalletCards}/>
            <StatCard value={auctions} label="Auction" change="-168.001%" icon={FileChartColumn} tone="red"/>
            <StatCard value="82K" label="Creators" change="+168.001%" icon={WalletCards} tone="green"/>
          </div>
        </div>
        <div>
          <h2 className="mb-5 text-[18px] font-semibold">ETH Price</h2>
          <EthPriceChart/>
        </div>
        <div className="md:col-span-2 xl:col-span-1">
          <h2 className="mb-5 text-[18px] font-semibold">Statistics</h2>
          <div className="surface flex h-[248px] flex-col items-center justify-center">
            <div className="relative h-[170px] w-[170px] rounded-full border-2 border-white" style={{background:"conic-gradient(#7048f4 0deg 180deg, #1c1937 180deg 360deg)"}}>
              <div className="absolute inset-[20px] rounded-full border-2 border-white bg-[#1c1937]"></div>
              <div className="absolute left-1/2 top-0 h-1/2 w-[2px] -translate-x-1/2 bg-white"></div>
              <div className="absolute bottom-0 left-1/2 h-1/2 w-[2px] -translate-x-1/2 bg-white"></div>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 px-3 text-[11px] text-[#7a7691]">
              <span><i className="mr-2 inline-block h-4 w-4 rounded-full bg-purple align-middle"/>Artwork Sold</span>
              <span><i className="mr-2 inline-block h-4 w-4 rounded-full border border-white align-middle"/>Artwork Cancel</span>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-9 grid gap-5 lg:grid-cols-[315px_minmax(0,1fr)]">
        <div>
          <div className="mb-5 flex justify-between"><h2 className="text-[18px] font-semibold">Recent Activity</h2><button className="text-purple">See more</button></div>
          <div className="surface overflow-hidden">
            {activities.slice(0,5).map((a,i)=><div key={i} className="flex min-h-[54px] items-center gap-3 border-b border-white/10 px-3.5 py-2.5 last:border-0">
              <Avatar src="/assets/papaya-avatar.jpg" className="h-8 w-8"/>
              <div className="flex-1"><b>Papaya</b><p className="text-[13px]">{a.text}</p></div><span className="text-[12px] muted">{a.time}</span>
            </div>)}
          </div>
        </div>
        <div>
          <h2 className="mb-5 text-[18px] font-semibold">Top Creators</h2>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {creators.map(c=><div key={c.id} className="surface flex h-[59px] items-center gap-3 px-3.5 py-2">
              <Avatar src="/assets/papaya-avatar.jpg" className="h-8 w-8"/>
              <div className="flex-1"><b>{c.name}</b><p className="text-[13px]">{c.items}</p></div>
              <FollowButton creatorId={c.id}/>
            </div>)}
          </div>
        </div>
      </section>
    </>
  );
}
