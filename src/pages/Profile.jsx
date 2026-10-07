import PageIntro from "../components/PageIntro";
import NFTCard from "../components/NFTCard";
import NFTGrid from "../components/NFTGrid";
import StatCard from "../components/StatCard";
import { Check, LockKeyhole, Users, Gavel, Coins } from "lucide-react";
import { useMarket } from "../context/MarketContext";
import Avatar from "../components/Avatar";

export default function Profile(){
  const { followingList, toggleFollow, bidsPlaced, bidVolume } = useMarket();
  return <>
    <PageIntro title="Profile" subtitle="Welcome Profile Page"/>
    <div className="mb-7 grid gap-5 sm:grid-cols-3">
      <StatCard value={followingList.length} label="Following" icon={Users}/>
      <StatCard value={bidsPlaced} label="Bids Placed" icon={Gavel} tone="green"/>
      <StatCard value={parseFloat(bidVolume.toFixed(4))} label="Bid Volume (ETH)" icon={Coins} tone="yellow"/>
    </div>
    <section className="grid gap-7 lg:grid-cols-[380px_1fr]">
      <div className="surface p-5">
        <Avatar src="/assets/papaya-avatar.jpg" className="h-11 w-11 ring-2 ring-white"/>
        <h2 className="mt-4 text-[18px] font-semibold">Welcome, John Smith</h2>
        <p className="mt-1 text-[14px]">Looks like you are not verified yet. Verify yourself to use the full potential of Xtrader.</p>
        <div className="mt-8 flex items-center gap-3 border-b border-white/20 pb-4 text-purple"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-green-500 text-white"><Check size={18}/></span>Verify account</div>
        <div className="flex items-center gap-3 pt-4 text-purple"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-purple text-white"><LockKeyhole size={17}/></span>Two-factor Authentication ( 2FA )</div>
      </div>
      <div>
        <h2 className="mb-5 text-[18px] font-semibold">Following</h2>
        {followingList.length === 0 && <p className="text-[14px] muted">You are not following anyone yet.</p>}
        <div className="grid gap-5 sm:grid-cols-2">
          {followingList.map(c=><div key={c.id} className="surface flex items-center gap-4 p-5">
            <Avatar src="/assets/papaya-avatar.jpg" className="h-11 w-11 shrink-0"/>
            <div className="min-w-0 flex-1"><b>{c.name}</b><p className="text-[13px]">{c.items}</p></div>
            <button onClick={()=>toggleFollow(c.id)} className="red-btn px-5 py-1.5 text-[13px]">Unfollow</button>
          </div>)}
        </div>
      </div>
    </section>
    <h2 className="mt-14 mb-6 text-[18px] font-semibold">My bought</h2>
    <NFTGrid>{[1,2,3,4].map(i=><NFTCard key={i} id={i}/>)}</NFTGrid>
    <h2 className="mt-14 mb-6 text-[18px] font-semibold">My Collections</h2>
    <NFTGrid>{[5,6,7,8].map(i=><NFTCard key={i} id={i}/>)}</NFTGrid>
  </>;
}
