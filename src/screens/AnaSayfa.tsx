// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Ana Sayfa
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Add onClick/onChange handlers to interactive elements
// 4. Replace placeholder data with props/state

import { useState } from "react";

interface AnaSayfaProps {}

export function AnaSayfa(props: AnaSayfaProps) {
  return (
    <>
      {/*  TopAppBar  */}
      <header className="bg-[#0b1326]/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-[#2d3449]/30 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tighter text-[#2563EB] font-headline">smoke-notlar</h1>
      <div className="hidden md:flex flex-1 max-w-md ml-8 mr-4">
      <div className="relative w-full">
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{fontVariationSettings: "'FILL' 0"}}>search</span>
      <input className="w-full bg-surface-container-high text-on-surface placeholder-on-surface-variant border-none rounded-full py-3 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:outline-none transition-shadow text-body-lg" placeholder="Notları ara..." type="text" />
      </div>
      </div>
      <div className="flex items-center gap-4 text-[#b4c5ff]">
      <button className="hover:bg-[#171f33] transition-all duration-300 rounded-full p-2 active:scale-[0.97] md:hidden">
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>search</span>
      </button>
      <button className="hover:bg-[#171f33] transition-all duration-300 rounded-full p-2 active:scale-[0.97]">
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>settings</span>
      </button>
      <button className="hover:bg-[#171f33] transition-all duration-300 rounded-full p-2 active:scale-[0.97]">
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>account_circle</span>
      </button>
      </div>
      </div>
      </header>
      {/*  Main Content  */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-28 space-y-12">
      {/*  Mobile SearchBar (Visible only on md hidden)  */}
      <div className="md:hidden w-full relative">
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{fontVariationSettings: "'FILL' 0"}}>search</span>
      <input className="w-full bg-surface-container-high text-on-surface placeholder-on-surface-variant border-none rounded-full py-4 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:outline-none transition-shadow text-body-lg shadow-sm" placeholder="Notları ara..." type="text" />
      </div>
      {/*  NoteForm Section  */}
      <section className="max-w-3xl mx-auto">
      <h2 className="text-[1.75rem] font-semibold text-on-surface mb-6 font-headline tracking-tight">Yeni Not Ekle</h2>
      <div className="bg-surface-container rounded-2xl p-1 md:p-6 shadow-sm border border-outline-variant/15 backdrop-blur-sm">
      <form className="space-y-6">
      <div>
      <input className="w-full bg-transparent text-on-surface text-[1rem] font-semibold placeholder-on-surface-variant border-none focus:ring-0 px-4 py-3 outline-none" placeholder="Başlık" required type="text" />
      </div>
      <div className="relative">
      <textarea className="w-full bg-surface-container-lowest text-on-surface placeholder-on-surface-variant border-none rounded-xl focus:ring-1 focus:ring-primary/50 px-4 py-4 resize-none outline-none text-body-lg transition-all" placeholder="Açıklama" required rows={4}></textarea>
      </div>
      <div className="flex justify-end pt-2">
      <button className="bg-primary-container text-on-primary-container hover:bg-primary-container/90 active:scale-[0.98] transition-all duration-200 px-8 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-sm shadow-primary/10" type="submit">
      <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>add</span>
                                  Ekle
                              </button>
      </div>
      </form>
      </div>
      </section>
      {/*  Notes Grid  */}
      <section className="pb-12">
      <h2 className="text-[1.75rem] font-semibold text-on-surface mb-8 font-headline tracking-tight">Son Notlar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/*  NoteCard 1  */}
      <div className="bg-surface-container rounded-2xl p-6 hover:bg-surface-container-high transition-colors duration-300 group cursor-pointer relative overflow-hidden flex flex-col h-full border border-transparent hover:border-outline-variant/15">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary/50 transition-colors"></div>
      <div className="flex justify-between items-start mb-4 pl-2">
      <h3 className="text-[1rem] font-semibold text-on-surface font-headline">Market Alışverişi</h3>
      <button className="text-on-surface-variant hover:text-on-surface opacity-0 group-hover:opacity-100 transition-opacity p-1 -mr-2 -mt-2">
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>more_vert</span>
      </button>
      </div>
      <p className="text-body-lg text-on-surface-variant mb-6 flex-grow pl-2 line-clamp-3">
                               Süt, ekmek, yumurta al.
                           </p>
      <div className="flex items-center gap-2 mt-auto pl-2">
      <span className="material-symbols-outlined text-[14px] text-on-surface-variant" style={{fontVariationSettings: "'FILL' 0"}}>schedule</span>
      <span className="text-[0.75rem] font-semibold text-on-surface-variant font-label tracking-wide">10 Dakika Önce</span>
      </div>
      </div>
      {/*  NoteCard 2  */}
      <div className="bg-surface-container rounded-2xl p-6 hover:bg-surface-container-high transition-colors duration-300 group cursor-pointer relative overflow-hidden flex flex-col h-full border border-transparent hover:border-outline-variant/15">
      <div className="absolute top-0 left-0 w-1 h-full bg-tertiary-container/30 group-hover:bg-tertiary-container/60 transition-colors"></div>
      <div className="flex justify-between items-start mb-4 pl-2">
      <h3 className="text-[1rem] font-semibold text-on-surface font-headline">Proje Sunumu</h3>
      <button className="text-on-surface-variant hover:text-on-surface opacity-0 group-hover:opacity-100 transition-opacity p-1 -mr-2 -mt-2">
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>more_vert</span>
      </button>
      </div>
      <p className="text-body-lg text-on-surface-variant mb-6 flex-grow pl-2 line-clamp-3">
                               Pazartesi saat 10:00'da.
                           </p>
      <div className="flex items-center gap-2 mt-auto pl-2">
      <span className="material-symbols-outlined text-[14px] text-on-surface-variant" style={{fontVariationSettings: "'FILL' 0"}}>schedule</span>
      <span className="text-[0.75rem] font-semibold text-on-surface-variant font-label tracking-wide">2 Saat Önce</span>
      </div>
      </div>
      </div>
      </section>
      </main>
      {/*  BottomNavBar  */}
      <nav className="md:hidden bg-[#0b1326]/90 backdrop-blur-lg fixed bottom-0 w-full z-50 rounded-t-2xl border-t border-[#2d3449]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3">
      <a className="flex flex-col items-center justify-center bg-[#2563eb]/10 text-[#b4c5ff] rounded-xl px-4 py-1 active:scale-90 transition-transform duration-200" href="#">
      <span className="material-symbols-outlined mb-1" style={{fontVariationSettings: "'FILL' 1"}}>description</span>
      <span className="text-[11px] font-semibold tracking-wide uppercase font-label">Notlar</span>
      </a>
      <a className="flex flex-col items-center justify-center text-[#dae2fd]/40 hover:text-[#b4c5ff] transition-colors active:scale-90 duration-200 px-4 py-1" href="#">
      <span className="material-symbols-outlined mb-1" style={{fontVariationSettings: "'FILL' 0"}}>archive</span>
      <span className="text-[11px] font-semibold tracking-wide uppercase font-label">Arşiv</span>
      </a>
      <a className="flex flex-col items-center justify-center text-[#dae2fd]/40 hover:text-[#b4c5ff] transition-colors active:scale-90 duration-200 px-4 py-1" href="#">
      <span className="material-symbols-outlined mb-1" style={{fontVariationSettings: "'FILL' 0"}}>person</span>
      <span className="text-[11px] font-semibold tracking-wide uppercase font-label">Profil</span>
      </a>
      </div>
      </nav>
    </>
  );
}
