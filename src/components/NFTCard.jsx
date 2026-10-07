import { motion } from "framer-motion";
import BidButton from "./BidButton";
import { useMarket } from "../context/MarketContext";
import { formatEth } from "../utils/format";

export default function NFTCard({ id, image="/assets/nft-liquid-wave.jpg", title="Liquid Wave", showBid=true, compact=false }) {
  const { cards, selectedCard, selectCard, placeCardBid } = useMarket();
  const card = cards.find(c => c.id === id);
  const bid = card ? card.bid : 0.05;
  const count = card ? card.bidCount : 0;
  const selected = id !== undefined && selectedCard === id;

  return (
    <motion.article
      whileHover={{y:-4}}
      onClick={() => id !== undefined && selectCard(id)}
      className={`surface p-5 ring-2 transition ${selected ? "ring-purple" : "ring-transparent"} ${id !== undefined ? "cursor-pointer" : ""} ${compact ? "min-h-0" : ""}`}
    >
      <img src={image} alt={title} className="h-[188px] w-full rounded-[17px] object-cover" />
      <div className="mt-6 flex items-center justify-between gap-2">
        <h3 className="text-[18px] font-semibold">{title}</h3>
        {showBid && <span className="text-[12px] muted">{count} {count === 1 ? "bid" : "bids"}</span>}
      </div>
      {showBid && (
        <>
          <div className="mt-3 grid grid-cols-2 text-[14px]">
            <span>Auction time</span>
            <span className="text-right">Current Bid</span>
          </div>
          <div className="mt-1 grid grid-cols-2 text-[15px]">
            <span className="muted">3h 1m 50s</span>
            <span className="text-right">
              <span className="block text-purple">{formatEth(bid)}</span>
              <span className="block muted">0.15 ETH</span>
            </span>
          </div>
          <BidButton
            placed={!!card?.placed}
            onClick={(e) => { e.stopPropagation(); if (card) placeCardBid(id); }}
            className="mt-5 h-[40px] w-full text-[14px]"
          />
        </>
      )}
    </motion.article>
  );
}
