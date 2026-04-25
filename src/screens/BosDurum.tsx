// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Boş Durum
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Add onClick/onChange handlers to interactive elements
// 4. Replace placeholder data with props/state

import { useState } from "react";

interface BosDurumProps {}

export function BosDurum(props: BosDurumProps) {
  return (
    <>
      {/*  TopAppBar  */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-surface-variant/30 shadow-[0_20px_40px_rgba(0,0,0,0.4)] font-headline antialiased tracking-tight">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tighter text-primary-container">smoke-notlar</h1>
      <div className="flex gap-2">
      <button aria-label="Settings" className="material-symbols-outlined text-primary hover:bg-surface-container transition-all duration-300 p-2.5 rounded-full active:scale-[0.97]">settings</button>
      <button aria-label="Account" className="material-symbols-outlined text-primary hover:bg-surface-container transition-all duration-300 p-2.5 rounded-full active:scale-[0.97]">account_circle</button>
      </div>
      </div>
      </header>
      <main className="flex-grow pt-28 px-4 md:px-8 max-w-4xl mx-auto w-full flex flex-col">
      {/*  NoteForm (Premium Deep Inset Area)  */}
      <section className="mb-16 w-full">
      <div className="bg-surface-container-low p-6 md:p-8 rounded-[12px] flex flex-col gap-4 relative overflow-hidden group">
      {/*  Subtle Top Gradient for depth  */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-container/20 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
      <input className="bg-transparent border-none text-on-surface text-2xl md:text-[1.75rem] font-headline font-semibold focus:ring-0 focus:outline-none placeholder:text-on-surface-variant/40 w-full px-0 leading-tight tracking-tight" placeholder="Not Başlığı..." type="text"/ />
      <textarea className="bg-transparent border-none text-on-surface-variant text-base font-body focus:ring-0 focus:outline-none placeholder:text-on-surface-variant/30 w-full px-0 resize-none min-h-[120px] leading-relaxed mt-2" placeholder="Aklınızdakileri dökmeye başlayın..."></textarea>
      <div className="flex justify-between items-center mt-4 border-t border-surface-variant/20 pt-4">
      <div className="flex gap-3">
      <button className="material-symbols-outlined text-on-surface-variant/60 hover:text-primary transition-colors text-xl" style={{fontVariationSettings: "'wght' 300"}}>format_list_bulleted</button>
      <button className="material-symbols-outlined text-on-surface-variant/60 hover:text-primary transition-colors text-xl" style={{fontVariationSettings: "'wght' 300"}}>image</button>
      <button className="material-symbols-outlined text-on-surface-variant/60 hover:text-primary transition-colors text-xl" style={{fontVariationSettings: "'wght' 300"}}>palette</button>
      </div>
      <button className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-semibold text-sm hover:brightness-110 active:scale-95 transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center gap-2">
      <span className="material-symbols-outlined text-[18px]">add</span>
                              Ekle
                          </button>
      </div>
      </div>
      </section>
      {/*  Empty State (The Nocturnal Archivist Aesthetic)  */}
      <section className="flex flex-col items-center justify-center flex-grow py-12 text-center opacity-90 animate-fade-in">
      {/*  Floating Tonal Circle  */}
      <div className="w-40 h-40 mb-10 rounded-full bg-surface-container flex items-center justify-center shadow-[0_0_60px_rgba(37,99,235,0.05)] relative">
      <div className="absolute inset-0 rounded-full border border-primary/10 scale-[1.15]"></div>
      <div className="absolute inset-0 rounded-full border border-primary/5 scale-[1.3]"></div>
      <span className="material-symbols-outlined text-[80px] text-primary-container/50" style={{fontVariationSettings: "'FILL' 0, 'wght' 200"}}>description</span>
      </div>
      <h2 className="text-3xl font-display font-bold text-on-surface mb-4 tracking-tight">Henüz not eklemediniz.</h2>
      <p className="text-on-surface-variant/80 text-lg font-body max-w-md leading-relaxed">
                      Yukarıdaki formu kullanarak ilk notunuzu hemen ekleyin.
                  </p>
      </section>
      </main>
      {/*  BottomNavBar (Mobile Only)  */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-background/90 backdrop-blur-lg border-t border-surface-variant/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] rounded-t-[20px]">
      <div className="flex justify-around items-center px-4 pb-6 pt-3">
      {/*  Active Tab  */}
      <button className="flex flex-col items-center justify-center bg-primary-container/10 text-primary rounded-xl px-6 py-2 active:scale-90 transition-transform duration-200">
      <span className="material-symbols-outlined mb-1" style={{fontVariationSettings: "'FILL' 1"}}>description</span>
      <span className="text-[11px] font-semibold tracking-wide uppercase">Notlar</span>
      </button>
      {/*  Inactive Tab  */}
      <button className="flex flex-col items-center justify-center text-on-surface/40 hover:text-primary transition-colors active:scale-90 duration-200 px-6 py-2">
      <span className="material-symbols-outlined mb-1">archive</span>
      <span className="text-[11px] font-semibold tracking-wide uppercase">Arşiv</span>
      </button>
      {/*  Inactive Tab  */}
      <button className="flex flex-col items-center justify-center text-on-surface/40 hover:text-primary transition-colors active:scale-90 duration-200 px-6 py-2">
      <span className="material-symbols-outlined mb-1">person</span>
      <span className="text-[11px] font-semibold tracking-wide uppercase">Profil</span>
      </button>
      </div>
      </nav>
    </>
  );
}
