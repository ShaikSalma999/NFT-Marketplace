import { useMarket } from "../context/MarketContext";

export default function FollowButton({ creatorId, className = "" }) {
  const { followed, toggleFollow } = useMarket();
  const on = followed.includes(creatorId);
  return (
    <button
      onClick={() => toggleFollow(creatorId)}
      aria-pressed={on}
      className={`min-w-[92px] rounded-[8px] border border-purple px-5 py-1 text-[13px] font-semibold transition ${
        on ? "bg-purple text-white" : "text-white hover:bg-purple/20"
      } ${className}`}
    >
      {on ? "Followed" : "Follow"}
    </button>
  );
}
