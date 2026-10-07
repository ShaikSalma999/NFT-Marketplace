import PageIntro from "../components/PageIntro";
import { useState } from "react";
import Avatar from "../components/Avatar";

export default function Settings(){
  const tabs=["Profile","Application","Security","Activity","Payment Method","API"];
  const [active,setActive]=useState("Profile");
  const [saved,setSaved]=useState(false);
  return <>
    <PageIntro title="Setting" subtitle="Welcome Setting Page"/>
    <div className="mb-12 flex flex-wrap gap-x-7 gap-y-3 text-[14px]">
      {tabs.map(t=><button key={t} onClick={()=>setActive(t)} className={active===t?"text-purple":""}>{t}</button>)}
    </div>
    <div className="grid gap-7 lg:grid-cols-2">
      <div><h2 className="mb-4 text-[18px] font-semibold">User profile</h2><div className="surface p-5">
        <label className="text-[14px] font-semibold">Full Name</label><input className="mt-2 h-10 w-full rounded-lg bg-ink px-4 outline-none"/>
        <div className="mt-5 flex items-center gap-3"><Avatar src="/assets/top-avatar.jpg" alt="John Smith" className="h-14 w-14"/><div><b>John Smith</b><p className="text-[13px]">Welcome Setting Page</p></div></div>
        <button onClick={()=>setSaved(true)} className="purple-btn mt-5 h-10 px-7">Save</button>
      </div></div>
      <div><h2 className="mb-4 text-[18px] font-semibold">Update Profile</h2><div className="surface p-5">
        <label className="text-[14px] font-semibold">Email</label><input className="mt-2 h-10 w-full rounded-lg bg-ink px-4 outline-none"/>
        <label className="mt-3 block text-[14px] font-semibold">Password</label><input type="password" className="mt-2 h-10 w-full rounded-lg bg-ink px-4 outline-none"/>
        <button onClick={()=>setSaved(true)} className="purple-btn mt-5 h-10 px-7">Save</button>
      </div></div>
    </div>
    <h2 className="mb-4 mt-14 text-[18px] font-semibold">Personal Information</h2>
    <div className="surface grid gap-5 p-5 md:grid-cols-2">
      {Array.from({length:6}).map((_,i)=><label key={i} className="text-[14px] font-semibold">Info<input className="mt-2 h-10 w-full rounded-lg bg-ink px-4 outline-none"/></label>)}
      <button onClick={()=>setSaved(true)} className="purple-btn h-10 w-fit px-7">Save</button>
    </div>
    {saved && <div className="fixed bottom-5 right-5 rounded-lg bg-[#272244] px-5 py-3 text-sm shadow-xl">Changes saved.</div>}
  </>;
}
