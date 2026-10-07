import { Check } from "lucide-react";

export default function Checkbox({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border transition ${
        checked ? "border-purple bg-purple" : "border-white/60 hover:border-white"
      }`}
    >
      {checked && <Check size={14} strokeWidth={3} />}
    </button>
  );
}
