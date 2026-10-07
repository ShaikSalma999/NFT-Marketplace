export default function BidButton({ placed, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={placed}
      aria-pressed={placed}
      className={`${placed ? "rounded-[9px] bg-[#45c91e] font-semibold cursor-default" : "purple-btn"} ${className}`}
    >
      {placed ? "Bid Placed" : "Place a Bid"}
    </button>
  );
}
