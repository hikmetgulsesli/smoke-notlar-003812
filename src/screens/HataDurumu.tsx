// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Hata Durumu
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Add onClick/onChange handlers to interactive elements
// 4. Replace placeholder data with props/state

import { useState } from "react";

interface HataDurumuProps {}

export function HataDurumu(props: HataDurumuProps) {
  return (
    <>
      {/*  Subtle Background Elements for Depth  */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-error-container via-background to-background"></div>
      <main className="relative z-10 w-full max-w-md px-6">
      {/*  Error State Card  */}
      <div className="bg-surface-container-low/80 backdrop-blur-xl rounded-[24px] p-10 flex flex-col items-center text-center shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-surface-container-highest/30">
      {/*  Icon Container with Glow  */}
      <div className="relative mb-8 group">
      <div className="absolute inset-0 bg-error/20 rounded-full blur-2xl group-hover:bg-error/30 transition-all duration-500"></div>
      <div className="relative w-24 h-24 bg-surface-container-lowest rounded-full flex items-center justify-center border border-error/20 shadow-inner">
      <span className="material-symbols-outlined text-[48px] text-error" data-icon="error" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>error</span>
      </div>
      </div>
      {/*  Error Messages  */}
      <h1 className="text-display font-bold text-3xl text-inverse-surface tracking-tight mb-4">Bir Sorun Oluştu</h1>
      <p className="text-body text-on-surface-variant text-lg leading-relaxed mb-10 max-w-xs mx-auto">
                      Notlar yüklenirken bir hata oluştu veya tarayıcı depolama alanına erişilemiyor.
                  </p>
      {/*  Action Button  */}
      <button className="w-full relative group overflow-hidden bg-primary-container text-on-primary-container font-label font-semibold text-base py-4 px-8 rounded-xl hover:bg-primary-container/90 active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      <span className="relative z-10 flex items-center justify-center gap-2">
      <span className="material-symbols-outlined text-[20px]" data-icon="refresh">refresh</span>
                          Tekrar Dene
                      </span>
      </button>
      </div>
      </main>
    </>
  );
}
