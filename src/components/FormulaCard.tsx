import React from 'react';
import { BookOpen, Infinity as InfinityIcon, ArrowRight, Zap, Check } from 'lucide-react';

export const FormulaCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950/60 rounded-2xl border border-slate-700/80 p-6 md:p-8 shadow-xl text-slate-100">
      
      {/* Top Banner with Author Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-slate-700/60 pb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <BookOpen className="w-5 h-5" />
          </span>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Harmonik Seri Formülü
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>İmza: <strong className="text-amber-300 font-semibold">Enes Öztürk</strong></span>
        </div>
      </div>

      {/* Primary Mathematical Display */}
      <div className="bg-slate-950/80 border border-indigo-500/20 rounded-xl p-5 md:p-6 mb-6 text-center shadow-inner relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
          Genel Matematiksel İfade
        </p>

        {/* Large stylized formula */}
        <div className="flex items-center justify-center flex-wrap gap-2 text-xl sm:text-2xl md:text-3xl font-mono text-white py-2">
          <span className="text-indigo-400 font-bold">H<sub>n</sub></span>
          <span className="text-slate-400">=</span>
          <span className="inline-flex items-center gap-1.5 text-amber-200">
            <span>1</span>
            <span className="text-slate-500">+</span>
            <span className="inline-flex flex-col items-center justify-center text-base sm:text-lg">
              <span className="border-b border-amber-300/60 px-1">1</span>
              <span>2</span>
            </span>
            <span className="text-slate-500">+</span>
            <span className="inline-flex flex-col items-center justify-center text-base sm:text-lg">
              <span className="border-b border-amber-300/60 px-1">1</span>
              <span>3</span>
            </span>
            <span className="text-slate-500">+</span>
            <span className="inline-flex flex-col items-center justify-center text-base sm:text-lg">
              <span className="border-b border-amber-300/60 px-1">1</span>
              <span>4</span>
            </span>
            <span className="text-slate-500">+</span>
            <span className="text-slate-400 font-sans">...</span>
            <span className="text-slate-500">+</span>
            <span className="inline-flex flex-col items-center justify-center text-base sm:text-lg">
              <span className="border-b border-indigo-300/60 px-1">1</span>
              <span>n</span>
            </span>
          </span>
          <span className="text-slate-400 mx-2">=</span>
          
          {/* Sigma Notation */}
          <div className="inline-flex items-center gap-1 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700 font-serif">
            <div className="flex flex-col items-center leading-none text-xs text-indigo-400">
              <span className="text-xs">n</span>
              <span className="text-2xl md:text-3xl font-bold my-[-3px] font-sans text-indigo-300">∑</span>
              <span className="text-xs">k=1</span>
            </div>
            <div className="flex flex-col items-center leading-none text-base sm:text-xl font-mono text-white ml-1">
              <span className="border-b border-slate-400 px-1">1</span>
              <span>k</span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mt-4 max-w-2xl mx-auto">
          Harmonik seri, pozitif tam sayıların çarpmaya göre terslerinin (resiprokallerinin) toplanmasıyla elde edilen sonsuz bir seridir.
        </p>
      </div>

      {/* 3 Key Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Örnek Değerler */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-2">
            <Zap className="w-4 h-4" />
            <span>İlk Birkaç Değer</span>
          </div>
          <ul className="text-xs space-y-1.5 text-slate-300 font-mono">
            <li className="flex justify-between items-center border-b border-slate-800/80 pb-1">
              <span className="text-slate-400">H₁ = 1</span>
              <span className="text-emerald-400">= 1.000000</span>
            </li>
            <li className="flex justify-between items-center border-b border-slate-800/80 pb-1">
              <span className="text-slate-400">H₂ = 1 + 1/2</span>
              <span className="text-emerald-400">= 1.500000</span>
            </li>
            <li className="flex justify-between items-center border-b border-slate-800/80 pb-1">
              <span className="text-slate-400">H₃ = 1 + 1/2 + 1/3</span>
              <span className="text-emerald-400">= 11/6 ≈ 1.8333</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-slate-400">H₄ = H₃ + 1/4</span>
              <span className="text-emerald-400">= 25/12 ≈ 2.0833</span>
            </li>
          </ul>
        </div>

        {/* Card 2: Euler-Mascheroni Sabiti */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-2">
            <span className="font-serif font-bold text-base">γ</span>
            <span>Euler-Mascheroni Yaklaşımı</span>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            Büyük <em>n</em> değerleri için harmonik seri doğal logaritma gibi büyür:
          </p>
          <div className="bg-slate-950 px-2.5 py-1.5 rounded text-xs font-mono text-amber-300 mb-2 text-center border border-slate-800">
            H<sub>n</sub> ≈ ln(n) + γ
          </div>
          <p className="text-[11px] text-slate-400">
            Euler sabiti <strong>γ ≈ 0.5772156649</strong>. Bu formül algoritma karmaşıklığı analizlerinde (örn. Hızlı Sıralama / Quicksort) sıkça kullanılır.
          </p>
        </div>

        {/* Card 3: Iraksaklık (Divergence) */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold mb-2">
            <InfinityIcon className="w-4 h-4" />
            <span>Iraksak Seri (Divergent)</span>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            Terimler sıfıra yaklaşsa da (lim 1/n = 0), toplam bir sayıya yakınsamaz!
          </p>
          <div className="bg-slate-950 px-2.5 py-1.5 rounded text-xs font-mono text-rose-300 mb-2 text-center border border-slate-800">
            lim<sub>n→∞</sub> H<sub>n</sub> = +∞
          </div>
          <p className="text-[11px] text-slate-400">
            Toplam sonsuza doğru çok yavaş büyür. Örneğin toplamın 20&apos;yi geçmesi için yaklaşık 272 milyon terim gerekir!
          </p>
        </div>

      </div>

    </div>
  );
};
