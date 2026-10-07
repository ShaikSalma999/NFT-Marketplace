export default function PageIntro({title, subtitle}) {
  return (
    <div className="flex items-end justify-between pt-6 pb-8">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="mt-1 text-[14px]">{subtitle}</p>}
      </div>
      <div className="hidden text-[14px] text-[#7b769c] md:block">Home <span className="mx-2 text-white">›</span> {title}</div>
    </div>
  );
}
