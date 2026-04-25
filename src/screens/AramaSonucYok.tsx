// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Arama Sonuç Yok
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Add onClick/onChange handlers to interactive elements
// 4. Replace placeholder data with props/state

import { useState } from "react";

interface AramaSonucYokProps {}

export function AramaSonucYok(props: AramaSonucYokProps) {
  return (
    <>
      {/*  TopAppBar  */}
      <header className="bg-[#0b1326]/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-[#2d3449]/30 shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
      <button aria-label="Geri Dön" className="text-on-surface hover:bg-[#171f33] transition-all duration-300 active:scale-[0.97] p-2 rounded-full hidden md:block">
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>arrow_back</span>
      </button>
      <div className="text-2xl font-bold tracking-tighter text-[#2563EB] font-['Inter'] antialiased tracking-tight">smoke-notlar</div>
      </div>
      <div className="flex-1 max-w-xl mx-4 relative hidden md:block">
      {/*  Search Bar Area in Header (Web)  */}
      <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <span className="material-symbols-outlined text-outline">search</span>
      </div>
      <input className="block w-full pl-10 pr-10 py-2 border-none rounded-xl bg-surface-container-high text-on-surface placeholder-on-surface-variant focus:ring-1 focus:ring-primary focus:bg-surface-container-highest transition-colors duration-200" placeholder="Notlarda ara..." type="text" value="olmayan bir not"/ />
      <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface">
      <span className="material-symbols-outlined">close</span>
      </button>
      </div>
      </div>
      <div className="flex items-center gap-2">
      <button aria-label="Ayarlar" className="text-[#b4c5ff] hover:bg-[#171f33] transition-all duration-300 active:scale-[0.97] p-2 rounded-full">
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>settings</span>
      </button>
      <button aria-label="Hesap" className="text-[#b4c5ff] hover:bg-[#171f33] transition-all duration-300 active:scale-[0.97] p-2 rounded-full">
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>account_circle</span>
      </button>
      </div>
      </div>
      </header>
      {/*  Main Content Canvas  */}
      <main className="flex-1 pt-24 pb-24 md:pb-8 flex flex-col items-center justify-center relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/*  Mobile Search Bar (Visible only on small screens)  */}
      <div className="w-full max-w-md mb-12 md:hidden">
      <div className="relative w-full shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <span className="material-symbols-outlined text-outline">search</span>
      </div>
      <input className="block w-full pl-12 pr-12 py-4 border-none rounded-2xl bg-surface-container-high text-on-surface placeholder-on-surface-variant focus:ring-1 focus:ring-primary focus:bg-surface-container-highest transition-colors duration-200 text-lg" placeholder="Notlarda ara..." type="text" value="olmayan bir not"/ />
      <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-on-surface active:scale-95 transition-transform">
      <span className="material-symbols-outlined">close</span>
      </button>
      </div>
      </div>
      {/*  Empty State Container  */}
      <div className="w-full max-w-lg flex flex-col items-center text-center space-y-8 p-8 rounded-[24px] bg-surface-container-lowest/50 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-outline-variant/10">
      {/*  Icon Illustration  */}
      <div className="relative flex items-center justify-center w-32 h-32 mb-4">
      <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl"></div>
      <div className="absolute inset-0 bg-surface-container rounded-full flex items-center justify-center border border-outline-variant/20 shadow-inner">
      <span className="material-symbols-outlined text-[64px] text-outline/50" style={{fontVariationSettings: "'FILL' 0, 'wght' 200"}}>search_off</span>
      </div>
      {/*  Floating decorative elements  */}
      <div className="absolute -top-2 -right-2 bg-surface-container-high p-2 rounded-full border border-outline-variant/30 shadow-lg">
      <span className="material-symbols-outlined text-sm text-secondary">description</span>
      </div>
      </div>
      {/*  Text Content  */}
      <div className="space-y-3">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface tracking-tight">Sonuç bulunamadı.</h2>
      <p className="text-lg text-on-surface-variant font-body max-w-sm mx-auto leading-relaxed">
                          "<span className="text-primary font-semibold">olmayan bir not</span>" için eşleşen bir sonuç bulamadık.
                      </p>
      </div>
      {/*  Action Suggestions  */}
      <div className="w-full flex flex-col gap-4 mt-8 pt-8 border-t border-surface-container-high">
      <button className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary-container py-3 px-6 rounded-xl font-semibold hover:bg-primary-container/90 active:scale-[0.98] transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
      <span className="material-symbols-outlined text-sm">clear_all</span>
                          Aramayı Temizle
                      </button>
      <p className="text-sm text-outline mt-2">veya farklı kelimelerle tekrar deneyin</p>
      </div>
      </div>
      </main>
      {/*  BottomNavBar (Mobile Only)  */}
      <nav className="bg-[#0b1326]/90 backdrop-blur-lg fixed bottom-0 w-full z-50 rounded-t-2xl border-t border-[#2d3449]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] md:hidden">
      <div className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3">
      <a className="flex flex-col items-center justify-center bg-[#2563eb]/10 text-[#b4c5ff] rounded-xl px-4 py-1 hover:text-[#b4c5ff] transition-colors active:scale-90 transition-transform duration-200" href="#">
      <span className="material-symbols-outlined mb-1" style={{fontVariationSettings: "'FILL' 1"}}>description</span>
      <span className="text-[11px] font-semibold tracking-wide uppercase">Notlar</span>
      </a>
      <a className="flex flex-col items-center justify-center text-[#dae2fd]/40 hover:text-[#b4c5ff] transition-colors active:scale-90 transition-transform duration-200" href="#">
      <span className="material-symbols-outlined mb-1" style={{fontVariationSettings: "'FILL' 0"}}>archive</span>
      <span className="text-[11px] font-semibold tracking-wide uppercase">Arşiv</span>
      </a>
      <a className="flex flex-col items-center justify-center text-[#dae2fd]/40 hover:text-[#b4c5ff] transition-colors active:scale-90 transition-transform duration-200" href="#">
      <span className="material-symbols-outlined mb-1" style={{fontVariationSettings: "'FILL' 0"}}>person</span>
      <span className="text-[11px] font-semibold tracking-wide uppercase">Profil</span>
      </a>
      </div>
      </nav>
    </>
  );
}
