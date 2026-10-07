export default function Avatar({ src, alt = "", className = "h-11 w-11" }) {
  return (
    <span className={`block shrink-0 overflow-hidden rounded-full ${className}`}>
      <img src={src} alt={alt} className="block h-full w-full scale-[1.14] rounded-full object-cover" />
    </span>
  );
}
