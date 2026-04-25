// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Ürün Gereksinimleri Dokümanı (PRD)
//
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Add onClick/onChange handlers to interactive elements
// 4. Replace placeholder data with props/state

import { useState } from "react";

interface UrunGereksinimleriDokumaniPrdProps {}

export function UrunGereksinimleriDokumaniPrd(props: UrunGereksinimleriDokumaniPrdProps) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-on-surface">
      <h1 className="text-3xl font-bold mb-8">smoke-notlar-003812 — Ürün Gereksinimleri Dokümanı (PRD)</h1>
      <div className="space-y-8 text-on-surface-variant leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-on-surface mb-4">1. Genel Bakış</h2>
          <p>Proje Adı: smoke-notlar-003812</p>
          <p>Platform: Web (React 18 + Vite + TypeScript)</p>
          <p>Tür: Tek sayfa not kartları uygulaması (SPA)</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-on-surface mb-4">2. Hedefler</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Hızlı not ekleme — Başlık ve opsiyonel açıklama ile saniyeler içinde kart oluşturma.</li>
            <li>Tamamlandı işaretleme — Kartları &quot;yapıldı&quot; olarak işaretleyerek görsel ayrım sağlama.</li>
            <li>Not silme — Gereksiz kartları tek tıkla silme (onay gerektirmez).</li>
            <li>localStorage kalıcılığı — Sayfa yenilense bile tüm veriler korunur.</li>
            <li>Responsive tasarım — Mobil (320px+) ve desktop (1920px+) ekranlarda düzgün çalışır.</li>
            <li>Erişilebilir UI — Klavye navigasyonu ve WCAG 2.1 AA uyumlu.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-on-surface mb-4">3. Tech Stack Detayı</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-surface-container p-4 rounded-lg">
              <p className="font-semibold text-on-surface">Framework</p>
              <p>React 18.3 (functional + hooks)</p>
            </div>
            <div className="bg-surface-container p-4 rounded-lg">
              <p className="font-semibold text-on-surface">Build</p>
              <p>Vite 5.x</p>
            </div>
            <div className="bg-surface-container p-4 rounded-lg">
              <p className="font-semibold text-on-surface">Dil</p>
              <p>TypeScript 5.x</p>
            </div>
            <div className="bg-surface-container p-4 rounded-lg">
              <p className="font-semibold text-on-surface">Storage</p>
              <p>localStorage (no backend)</p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-on-surface mb-4">4. Fonksiyonel Gereksinimler</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-on-surface mb-2">4.1 Not Kartı Oluşturma</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Zorunlu alan: Başlık (title), en az 1 karakter, maks 100 karakter.</li>
                <li>Opsiyonel alan: Açıklama (description), maks 500 karakter.</li>
                <li>Oluşturulma tarihi: Otomatik ISO formatında saklanır.</li>
                <li>ID: crypto.randomUUID() ile benzersiz atanır.</li>
                <li>Varsayılan durum: completed: false</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-on-surface mb-2">4.2 Not Kartı Tamamlandı İşaretleme</h3>
              <p className="text-sm">Her kartın solunda bir onay kutusu bulunur. Tıklandığında completed alanı tersine çevrilir. Tamamlanmış kartlar: başlık üstü çizili, opacity 0.6.</p>
            </div>
            <div>
              <h3 className="font-semibold text-on-surface mb-2">4.3 Not Kartı Silme</h3>
              <p className="text-sm">Her kartın sağ üstünde bir Sil butonu bulunur. Tıklandığında kart hemen silinir (onay dialogu YOK).</p>
            </div>
            <div>
              <h3 className="font-semibold text-on-surface mb-2">4.4 localStorage Kalıcılığı</h3>
              <p className="text-sm">Her kart değişikliğinde tüm liste localStorage ile kaydedilir. Sayfa yüklendiğinde liste geri yüklenir. Storage key: smoke-notlar-003812-notes</p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-on-surface mb-4">5. Veri Modeli</h2>
          <div className="bg-surface-container p-4 rounded-lg font-mono text-sm">
            <p className="text-on-surface font-semibold mb-2">interface Note &#123;</p>
            <p className="pl-4">id: string;</p>
            <p className="pl-4">title: string; // 1-100 karakter</p>
            <p className="pl-4">description: string; // 0-500 karakter, opsiyonel</p>
            <p className="pl-4">completed: boolean; // varsayılan: false</p>
            <p className="pl-4">createdAt: string; // ISO 8601 timestamp</p>
            <p className="text-on-surface font-semibold">&#125;</p>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-on-surface mb-4">6. UI/UX Gereksinimler</h2>
          <p className="text-sm">Minimal tasarım — beyaz alan, net sınırlar, yumuşak gölgeler. Erişilebilirlik: WCAG 2.1 AA uyumlu. Responsive: mobil 320px&apos;den desktop 1920px&apos;e kadar.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-on-surface mb-4">7. Kabul Kriterleri</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Yeni not eklenebilir — başlık + opsiyonel açıklama ile</li>
            <li>Not tamamlandı olarak işaretlenebilir ve görsel değişir</li>
            <li>Not silinebilir (animasyonla)</li>
            <li>Sayfa yenilendiğinde tüm notlar korunur (localStorage)</li>
            <li>Arama ile notlar filtrelenebilir</li>
            <li>Boş durum mesajı gösterilir</li>
            <li>Tüm butonlar minimum 44x44px touch target</li>
            <li>Klavye ile tüm işlemler yapılabilir</li>
            <li>Responsive: mobil 320px&apos;de düzgün görünür</li>
            <li>Hiç emoji kullanılmamış — sadece Lucide ikonları</li>
            <li>Türkçe tüm kullanıcı metinleri</li>
            <li>Bundle &lt; 150KB gzipped</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
