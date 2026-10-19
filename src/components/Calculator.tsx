import React, { useState, useMemo } from 'react';
import {
  calculateHarmonicFloat,
  calculateHarmonicFraction,
  generateHarmonicSteps,
  harmonicApproximation,
  EULER_MASCHERONI,
} from '../utils/harmonic';
import {
  Calculator as CalcIcon,
  RotateCcw,
  Sliders,
  TrendingUp,
  Hash,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface CalculatorProps {
  onSendToJava?: (n: number) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onSendToJava }) => {
  const [n, setN] = useState<number>(5);
  const [activeStepTab, setActiveStepTab] = useState<'chart' | 'steps'>('chart');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const presetValues = [1, 2, 3, 4, 5, 8, 10, 15, 20, 50, 100];

  // Floating point sum
  const floatSum = useMemo(() => calculateHarmonicFloat(n), [n]);

  // Exact rational fraction (calculated if n <= 45 to keep responsiveness smooth)
  const exactFraction = useMemo(() => {
    if (n <= 45) {
      return calculateHarmonicFraction(n);
    }
    return null;
  }, [n]);

  // Logarithmic approximation
  const approxSum = useMemo(() => {
    if (n <= 0) return 0;
    return harmonicApproximation(n);
  }, [n]);

  const approxDiff = useMemo(() => {
    return Math.abs(floatSum - approxSum);
  }, [floatSum, approxSum]);

  // Steps for table & chart
  const steps = useMemo(() => {
    return generateHarmonicSteps(n, Math.min(n, 40));
  }, [n]);

  const handleInputChange = (val: string) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) {
      setN(1);
    } else {
      setN(Math.max(1, Math.min(num, 50000)));
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl text-slate-100">
      
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <CalcIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              İnteraktif Harmonik Seri Hesaplayıcı
            </h2>
            <p className="text-xs text-slate-400">
              İstediğiniz <em>n</em> sayısını girin; kesirli, ondalık ve adım adım sonuçları anında görün.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:inline">Geliştirici:</span>
          <span className="text-xs bg-slate-800 text-indigo-300 font-semibold px-3 py-1 rounded-full border border-slate-700">
            Enes Öztürk İmzalı
          </span>
        </div>
      </div>

      {/* Input Controls */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Direct Number Input */}
          <div className="lg:col-span-5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Hesaplanacak Terim Sayısı (n)
            </label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  min="1"
                  max="50000"
                  value={n}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full bg-slate-900 border border-indigo-500/40 rounded-xl px-4 py-3 text-lg font-mono font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="n değeri (örn. 5)"
                />
                <span className="absolute right-3 top-3 text-xs text-slate-500 font-mono">
                  n ∈ ℕ⁺
                </span>
              </div>

              {onSendToJava && (
                <button
                  onClick={() => onSendToJava(n)}
                  title="Bu n değerini Java kodunda ve simülatöründe test et"
                  className="px-3.5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30 whitespace-nowrap"
                >
                  <span>Java&apos;da Dene</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Slider */}
          <div className="lg:col-span-7">
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                Hızlı Kaydırıcı (1 - 100)
              </span>
              <span className="font-mono text-indigo-300 font-bold">n = {n}</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={Math.min(n, 100)}
              onChange={(e) => setN(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />

            {/* Quick preset chips */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              <span className="text-[11px] text-slate-500 mr-1">Hızlı Seçim:</span>
              {presetValues.map((val) => (
                <button
                  key={val}
                  onClick={() => setN(val)}
                  className={`text-xs px-2.5 py-1 rounded-md transition-all font-mono ${
                    n === val
                      ? 'bg-indigo-600 text-white font-bold ring-1 ring-indigo-400'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Primary Result Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Card 1: Ondalık Değer */}
        <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-xl p-5 relative overflow-hidden">
          <div className="text-xs uppercase tracking-wider font-semibold text-indigo-300 mb-1 flex items-center justify-between">
            <span>Harmonik Toplam H({n})</span>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">Ondalık</span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1 break-all tracking-tight">
            {floatSum.toFixed(8)}
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">
            Hassas Değer: {floatSum.toFixed(14)}
          </p>
        </div>

        {/* Card 2: Tam Kesirli Hali (Pay / Payda) */}
        <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-xl p-5">
          <div className="text-xs uppercase tracking-wider font-semibold text-emerald-300 mb-1 flex items-center justify-between">
            <span>Rasyonel Tam Kesir</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">Pay / Payda</span>
          </div>
          {exactFraction ? (
            <div className="mt-1">
              <div className="font-mono text-lg font-bold text-emerald-300 break-all leading-tight">
                {exactFraction.num.toString()}
              </div>
              <div className="w-full h-0.5 bg-emerald-500/40 my-1"></div>
              <div className="font-mono text-sm text-slate-300 break-all leading-tight">
                {exactFraction.den.toString()}
              </div>
            </div>
          ) : (
            <div className="mt-2 text-xs text-slate-400">
              <p className="font-semibold text-amber-300">Büyük Sayı (n &gt; 45)</p>
              <p className="text-[11px] mt-1">Kesir pay ve paydası yüzlerce basamağa ulaştığı için ondalık gösterim aktiftir.</p>
            </div>
          )}
        </div>

        {/* Card 3: Asimptotik Yaklaşım ln(n) + gamma */}
        <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-xl p-5">
          <div className="text-xs uppercase tracking-wider font-semibold text-amber-300 mb-1 flex items-center justify-between">
            <span>ln(n) + γ Yaklaşımı</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">Euler Formülü</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white mt-1">
            {approxSum.toFixed(8)}
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono flex items-center justify-between">
            <span>Hata Payı:</span>
            <span className="text-amber-400">{approxDiff < 0.0001 ? '< 0.0001' : approxDiff.toFixed(6)}</span>
          </p>
        </div>

        {/* Card 4: Son Eklenen Terim */}
        <div className="bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/30 rounded-xl p-5">
          <div className="text-xs uppercase tracking-wider font-semibold text-cyan-300 mb-1 flex items-center justify-between">
            <span>Son Terim (1/{n})</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">aₙ</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white mt-1">
            {(1.0 / n).toFixed(8)}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            n büyüdükçe bu terim 0&apos;a yaklaşır.
          </p>
        </div>

      </div>

      {/* View Switcher: Interactive Chart vs Step-by-Step Table */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStepTab('chart')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeStepTab === 'chart'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Grafik Görselleştirmesi</span>
          </button>
          <button
            onClick={() => setActiveStepTab('steps')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeStepTab === 'steps'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Adım Adım Terim Tablosu</span>
          </button>
        </div>

        <div className="text-xs text-slate-400 hidden sm:block">
          {n > 40 ? `İlk 40 terim gösteriliyor (Toplam n=${n})` : `Tüm ${n} terim listeleniyor`}
        </div>
      </div>

      {/* Visual Content: Chart View */}
      {activeStepTab === 'chart' && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 mb-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4 text-xs text-slate-400">
            <div>
              <span className="font-semibold text-slate-200">Terimler ve Kümülatif Harmonik Eğri:</span>
              <span className="ml-2 text-indigo-400">Mavi = Kümülatif Toplam H(k)</span>,
              <span className="ml-2 text-amber-400">Turuncu = Terim Değeri (1/k)</span>
            </div>
            {hoveredIndex !== null && steps[hoveredIndex] && (
              <div className="text-xs font-mono bg-slate-800 px-3 py-1 rounded text-white border border-slate-700">
                k={steps[hoveredIndex].k} | Terim=1/{steps[hoveredIndex].k} (
                {steps[hoveredIndex].termValue.toFixed(4)}) | Toplam=
                {steps[hoveredIndex].cumulativeSum.toFixed(4)}
              </div>
            )}
          </div>

          {/* Responsive SVG Chart */}
          <div className="h-56 w-full relative">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 800 200"
              preserveAspectRatio="none"
            >
              {/* Grid lines */}
              <line x1="0" y1="40" x2="800" y2="40" stroke="#334155" strokeDasharray="3 3" />
              <line x1="0" y1="90" x2="800" y2="90" stroke="#334155" strokeDasharray="3 3" />
              <line x1="0" y1="140" x2="800" y2="140" stroke="#334155" strokeDasharray="3 3" />
              <line x1="0" y1="185" x2="800" y2="185" stroke="#475569" strokeWidth="1.5" />

              {/* Bars for individual terms 1/k */}
              {steps.map((st, i) => {
                const totalSteps = steps.length;
                const barWidth = Math.max(4, Math.min(24, 760 / totalSteps - 4));
                const x = 30 + (i * (740 / (totalSteps > 1 ? totalSteps - 1 : 1)));
                // scale termValue (max is 1 at k=1) to height up to 80
                const barHeight = Math.max(3, st.termValue * 90);
                const y = 185 - barHeight;

                return (
                  <rect
                    key={`bar-${st.k}`}
                    x={x - barWidth / 2}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="2"
                    fill={hoveredIndex === i ? '#f59e0b' : '#d97706'}
                    opacity={hoveredIndex === i ? 1 : 0.8}
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                );
              })}

              {/* Cumulative Line Path */}
              {steps.length > 1 && (
                <path
                  d={steps
                    .map((st, i) => {
                      const totalSteps = steps.length;
                      const x = 30 + (i * (740 / (totalSteps - 1)));
                      const maxCum = steps[steps.length - 1].cumulativeSum || 1;
                      // scale cumulative from y=180 to y=20
                      const y = 185 - (st.cumulativeSum / maxCum) * 155;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              )}

              {/* Dots on cumulative line */}
              {steps.map((st, i) => {
                const totalSteps = steps.length;
                const x = 30 + (i * (740 / (totalSteps > 1 ? totalSteps - 1 : 1)));
                const maxCum = steps[steps.length - 1].cumulativeSum || 1;
                const y = 185 - (st.cumulativeSum / maxCum) * 155;

                return (
                  <circle
                    key={`dot-${st.k}`}
                    cx={x}
                    cy={y}
                    r={hoveredIndex === i ? 6 : 3.5}
                    fill="#818cf8"
                    stroke="#1e1b4b"
                    strokeWidth="2"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500 font-mono mt-2 px-6">
            <span>k = 1</span>
            <span>k = {Math.round(steps.length / 2)}</span>
            <span>k = {steps.length}</span>
          </div>
        </div>
      )}

      {/* Step-by-Step Table View */}
      {activeStepTab === 'steps' && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden mb-4">
          <div className="overflow-x-auto max-h-80">
            <table className="w-full text-left text-xs text-slate-300 font-mono">
              <thead className="bg-slate-900 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 sticky top-0">
                <tr>
                  <th className="py-2.5 px-4">Adım (k)</th>
                  <th className="py-2.5 px-4">Terim (1/k)</th>
                  <th className="py-2.5 px-4">Terim Değeri (Ondalık)</th>
                  <th className="py-2.5 px-4">Kümülatif Toplam (H_k)</th>
                  <th className="py-2.5 px-4">Tam Kesir (Pay / Payda)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {steps.map((step) => (
                  <tr
                    key={step.k}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-2 px-4 text-indigo-400 font-bold">
                      #{step.k}
                    </td>
                    <td className="py-2 px-4 font-semibold text-amber-300">
                      1 / {step.k}
                    </td>
                    <td className="py-2 px-4 text-slate-300">
                      {step.termValue.toFixed(6)}
                    </td>
                    <td className="py-2 px-4 text-emerald-400 font-bold">
                      {step.cumulativeSum.toFixed(6)}
                    </td>
                    <td className="py-2 px-4 text-slate-400 text-[11px]">
                      {step.k <= 40 ? (
                        <span>
                          {step.cumulativeFraction.num.toString()} /{' '}
                          {step.cumulativeFraction.den.toString()}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bottom Notes & Formula Verification */}
      <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Formül doğrulaması: <strong>H({n})</strong> toplamı pozitif tam sayıların çarpmaya göre tersiyle hesaplanmıştır.
          </span>
        </div>
        <div className="font-semibold text-indigo-300 shrink-0">
          Enes Öztürk
        </div>
      </div>

    </div>
  );
};
