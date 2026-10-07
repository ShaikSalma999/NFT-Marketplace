export default function StatCard({value, label, change, icon: Icon, tone="purple"}) {
  const bg = tone === "red" ? "bg-red" : tone === "green" ? "bg-[#45c91e]" : tone === "yellow" ? "bg-[#f7d21d]" : "bg-purple";
  return (
    <div className="surface flex h-[70px] items-center gap-4 px-3.5 py-2.5">
      <div className={`grid h-[40px] w-[40px] shrink-0 place-items-center rounded-full ${bg}`}>
        <Icon size={18}/>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-4">
          <strong className="text-[22px] leading-none">{value}</strong>
          {change && <span className={`hidden text-[12px] md:inline ${tone === "red" ? "text-red" : "text-[#42c51f]"}`}>{change}</span>}
        </div>
        <p className="mt-0.5 text-[12px] text-[#76728a]">{label}</p>
      </div>
    </div>
  );
}
