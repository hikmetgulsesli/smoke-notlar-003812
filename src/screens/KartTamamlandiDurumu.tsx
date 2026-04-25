// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Kart Tamamlandı Durumu
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Add onClick/onChange handlers to interactive elements
// 4. Replace placeholder data with props/state

import { useState } from "react";

interface KartTamamlandiDurumuProps {}

export function KartTamamlandiDurumu(props: KartTamamlandiDurumuProps) {
  return (
    <>
      {/*  TopAppBar  */}
      <header className="fixed top-0 w-full z-50 bg-[#0b1326]/80 backdrop-blur-md border-b border-[#2d3449]/30 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex justify-between items-center px-6 py-4 max-w-7xl mx-auto hidden md:flex font-['Inter'] antialiased tracking-tight text-[#b4c5ff]">
      <div className="text-2xl font-bold tracking-tighter text-[#2563EB]">smoke-notlar</div>
      <div className="flex items-center gap-6">
      {/*  Navigation items for Web  */}
      <nav className="flex gap-6 mr-8">
      <a className="text-[#b4c5ff] font-semibold text-sm tracking-wide" href="#">Notlar</a>
      <a className="text-[#dae2fd]/60 hover:bg-[#171f33] transition-all duration-300 rounded-md px-2 py-1 text-sm tracking-wide" href="#">Arşiv</a>
      </nav>
      <div className="flex items-center gap-4">
      <button className="hover:bg-[#171f33] transition-all duration-300 p-2 rounded-full active:scale-[0.97] flex items-center justify-center">
      <span className="material-symbols-outlined text-[#dae2fd]/60 text-xl" style={{fontVariationSettings: "'wght' 300"}}>search</span>
      </button>
      <button className="hover:bg-[#171f33] transition-all duration-300 p-2 rounded-full active:scale-[0.97] flex items-center justify-center">
      <span className="material-symbols-outlined text-[#dae2fd]/60 text-xl" style={{fontVariationSettings: "'wght' 300"}}>settings</span>
      </button>
      <button className="hover:bg-[#171f33] transition-all duration-300 p-2 rounded-full active:scale-[0.97] flex items-center justify-center">
      <span className="material-symbols-outlined text-[#dae2fd]/60 text-xl" style={{fontVariationSettings: "'wght' 300"}}>account_circle</span>
      </button>
      </div>
      </div>
      </header>
      {/*  Main Canvas  */}
      <main className="flex-grow pt-8 pb-32 md:pt-32 px-6 max-w-5xl mx-auto w-full relative z-10">
      {/*  Header Section  */}
      <div className="mb-12">
      <h1 className="text-4xl font-bold tracking-tight text-on-surface mb-2">Güncel Notlar</h1>
      <p className="text-on-surface-variant text-sm tracking-wide">Düşüncelerinizi düzenleyin ve odaklanın.</p>
      </div>
      {/*  Asymmetric Bento-style Grid  */}
      <div className="columns-1 md:columns-2 gap-6 space-y-6">
      {/*  Completed Card  */}
      <article className="bg-surface-container rounded-[12px] p-6 break-inside-avoid opacity-60 transition-opacity duration-300 group">
      <div className="flex items-start gap-4">
      <button className="mt-1 flex-shrink-0 focus:outline-none">
      <span className="material-symbols-outlined text-primary text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
      </button>
      <div>
      <h2 className="text-base font-semibold text-on-surface-variant line-through mb-3">E-postaları Yanıtla</h2>
      <p className="text-sm text-on-surface-variant/70 leading-relaxed mb-4 line-through">
                                  Hafta başı biriken tüm müşteri maillerine geri dönüş yapılacak. Özellikle tasarım revizyonları bekleyen dosyaları önceliklendir.
                              </p>
      <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-semibold tracking-wider uppercase">İş</span>
      <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-semibold tracking-wider uppercase">Öncelikli</span>
      </div>
      </div>
      </div>
      </article>
      {/*  Normal Card 1  */}
      <article className="bg-surface-container rounded-[12px] p-6 break-inside-avoid hover:bg-surface-container-high transition-colors duration-300 cursor-pointer">
      <div className="flex items-start gap-4">
      <button className="mt-1 flex-shrink-0 focus:outline-none group">
      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-2xl">radio_button_unchecked</span>
      </button>
      <div>
      <h2 className="text-lg font-semibold text-on-surface mb-3 tracking-tight">Proje Toplantısı Notları</h2>
      <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                                  Yeni sprint planlaması için ana hedefler belirlendi. Karanlık mod optimizasyonları ve tonal katmanlama üzerine odaklanılacak. Component yapısı güncellenecek.
                              </p>
      <div className="flex items-center justify-between mt-auto">
      <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-primary text-[10px] font-semibold tracking-wider uppercase">Tasarım</span>
      </div>
      <span className="text-[11px] text-on-surface-variant/50 font-medium">10:30 AM</span>
      </div>
      </div>
      </div>
      </article>
      {/*  Normal Card 2  */}
      <article className="bg-surface-container rounded-[12px] p-6 break-inside-avoid hover:bg-surface-container-high transition-colors duration-300 cursor-pointer">
      <div className="flex items-start gap-4">
      <button className="mt-1 flex-shrink-0 focus:outline-none group">
      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-2xl">radio_button_unchecked</span>
      </button>
      <div>
      <h2 className="text-lg font-semibold text-on-surface mb-3 tracking-tight">Haftalık Alışveriş Listesi</h2>
      <ul className="text-sm text-on-surface-variant space-y-2 mb-6">
      <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/50"></span> Yulaf ezmesi</li>
      <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/50"></span> Filtre kahve</li>
      <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/50"></span> Badem sütü</li>
      <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/50"></span> Taze sebzeler</li>
      </ul>
      <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-secondary text-[10px] font-semibold tracking-wider uppercase">Kişisel</span>
      </div>
      </div>
      </div>
      </article>
      {/*  Normal Card 3 - Ideas  */}
      <article className="bg-primary-container/10 border border-primary/10 rounded-[12px] p-6 break-inside-avoid hover:bg-primary-container/20 transition-colors duration-300 cursor-pointer relative overflow-hidden">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
      <div className="flex items-start gap-4 relative z-10">
      <button className="mt-1 flex-shrink-0 focus:outline-none group">
      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-2xl">radio_button_unchecked</span>
      </button>
      <div>
      <div className="flex items-center gap-2 mb-3">
      <span className="material-symbols-outlined text-primary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>lightbulb</span>
      <h2 className="text-lg font-semibold text-primary-fixed-dim tracking-tight">Tasarım Sistemi Revizyonu</h2>
      </div>
      <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                                  "Gece Arşivcisi" konseptini daha da derinleştirmek için cam efektlerini (glassmorphism) sadece modal pencerelerde değil, seçili kart detaylarında da kullanmayı düşün.
                              </p>
      </div>
      </div>
      </article>
      </div>
      </main>
      {/*  FAB (Floating Action Button)  */}
      <button className="fixed bottom-24 md:bottom-12 right-6 md:right-12 w-14 h-14 bg-primary-container rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:bg-primary transition-colors z-40 group">
      <span className="material-symbols-outlined text-on-primary-container text-2xl group-hover:scale-110 transition-transform">add</span>
      </button>
      {/*  BottomNavBar (Mobile Only)  */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-[#0b1326]/90 backdrop-blur-lg border-t border-[#2d3449]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] rounded-t-2xl z-50">
      {/*  Active Tab: Notlar  */}
      <a className="flex flex-col items-center justify-center bg-[#2563eb]/10 text-[#b4c5ff] rounded-xl px-4 py-1 hover:text-[#b4c5ff] transition-colors active:scale-90 duration-200" href="#">
      <span className="material-symbols-outlined mb-1" style={{fontVariationSettings: "'FILL' 1"}}>description</span>
      <span className="text-[11px] font-semibold tracking-wide uppercase">Notlar</span>
      </a>
      {/*  Inactive Tab: Arşiv  */}
      <a className="flex flex-col items-center justify-center text-[#dae2fd]/40 hover:text-[#b4c5ff] transition-colors active:scale-90 duration-200 px-4 py-1" href="#">
      <span className="material-symbols-outlined mb-1">archive</span>
      <span className="text-[11px] font-semibold tracking-wide uppercase">Arşiv</span>
      </a>
      {/*  Inactive Tab: Profil  */}
      <a className="flex flex-col items-center justify-center text-[#dae2fd]/40 hover:text-[#b4c5ff] transition-colors active:scale-90 duration-200 px-4 py-1" href="#">
      <span className="material-symbols-outlined mb-1">person</span>
      <span className="text-[11px] font-semibold tracking-wide uppercase">Profil</span>
      </a>
      </nav>
    </>
  );
}
