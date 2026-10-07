export default function NFTGrid({ children }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4">
      {children}
    </div>
  );
}
