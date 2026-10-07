import PageIntro from "../components/PageIntro";
import NFTCard from "../components/NFTCard";
import NFTGrid from "../components/NFTGrid";
import { nftImages } from "../data";
import { useState } from "react";

export default function MarketGrid({title, subtitle}) {
  const [tab,setTab]=useState("All");
  return <>
    <PageIntro title={title} subtitle={subtitle}/>
    {title==="Collections" && <div className="mb-5 flex gap-3 text-[14px]">{["All","Artwork","Book"].map(t=><button key={t} onClick={()=>setTab(t)} className={tab===t?"rounded-full bg-purple px-4 py-0.5":"px-1"}>{t}</button>)}</div>}
    <NFTGrid>
      {nftImages.map((img,i)=><NFTCard key={i} id={i+1} image={img}/>)}
    </NFTGrid>
  </>;
}
