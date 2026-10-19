import React from 'react';
import { Sigma, Code2, Heart, Award, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-slate-800 bg-slate-950 text-slate-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Signature Box */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 sm:p-8 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 ring-4 ring-slate-900">
              <span className="font-serif font-bold text-2xl tracking-tighter">EÖ</span>
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Enes Öztürk
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-medium border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  İmzalı Proje
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Java Nesne Yönelimli Programlama &amp; Matematiksel Seri Analizi Projesi.
                Harmonik serinin algoritmik ve matematiksel çözümü.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-center sm:text-right">
              <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Tarih</div>
              <div className="text-sm font-mono text-slate-200">2026</div>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>
            <div className="text-center sm:text-right">
              <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Dil &amp; Teknoloji</div>
              <div className="text-sm font-mono text-indigo-400">Java 21 / React</div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Sigma className="w-4 h-4 text-indigo-400" />
            <span>Harmonik Seri: H(n) = 1 + 1/2 + 1/3 + ... + 1/n</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Hazırlayan ve Kodlayan:</span>
            <strong className="text-slate-300 font-semibold">Enes Öztürk</strong>
          </div>
        </div>

      </div>
    </footer>
  );
};
