import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, Check, Sparkles } from 'lucide-react';

interface JavaTerminalSimulatorProps {
  initialN?: number;
}

export const JavaTerminalSimulator: React.FC<JavaTerminalSimulatorProps> = ({ initialN = 5 }) => {
  const [inputVal, setInputVal] = useState<string>(initialN.toString());
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [executed, setExecuted] = useState<boolean>(false);

  const runSimulation = (valToRun?: string) => {
    const raw = valToRun !== undefined ? valToRun : inputVal;
    const n = parseInt(raw, 10);

    if (isNaN(n) || n <= 0) {
      setOutputLines([
        '$ javac HarmonikSeri.java',
        '$ java HarmonikSeri',
        '==================================================',
        '  HARMONİK SERİ HESAPLAMA PROGRAMI - ENES ÖZTÜRK  ',
        '==================================================',
        `Lütfen bir n sayısı giriniz: ${raw}`,
        'Hata: Lütfen 0\'dan büyük pozitif bir tam sayı giriniz!',
      ]);
      setExecuted(true);
      return;
    }

    setIsRunning(true);
    setExecuted(true);

    const lines: string[] = [
      '$ javac HarmonikSeri.java',
      '$ java HarmonikSeri',
      '==================================================',
      '  HARMONİK SERİ HESAPLAMA PROGRAMI - ENES ÖZTÜRK  ',
      '==================================================',
      `Lütfen bir n sayısı giriniz: ${n}`,
      '',
      '--- Adım Adım Hesaplama ---',
    ];

    let toplam = 0.0;
    const displayLimit = Math.min(n, 12);

    for (let i = 1; i <= displayLimit; i++) {
      const terim = 1.0 / i;
      toplam += terim;
      lines.push(
        `Adım ${String(i).padStart(2, ' ')}: 1/${String(i).padEnd(2, ' ')} = ${terim.toFixed(6)}  -->  Kümülatif Toplam: ${toplam.toFixed(6)}`
      );
    }

    if (n > 12) {
      lines.push(`... (${n - 12} ara adım arka planda hesaplanıyor) ...`);
      // calculate rest
      for (let i = displayLimit + 1; i < n; i++) {
        toplam += 1.0 / i;
      }
      const sonTerim = 1.0 / n;
      toplam += sonTerim;
      lines.push(
        `Adım ${String(n).padStart(2, ' ')}: 1/${String(n).padEnd(2, ' ')} = ${sonTerim.toFixed(6)}  -->  Kümülatif Toplam: ${toplam.toFixed(6)}`
      );
    }

    lines.push('--------------------------------------------------');
    lines.push(`Sonuç: H(${n}) = ${toplam.toFixed(8)}`);
    lines.push('==================================================');
    lines.push('Program başarıyla sonlandı. Geliştirici: Enes Öztürk');

    setOutputLines(lines);
    setIsRunning(false);
  };

  const handleReset = () => {
    setOutputLines([]);
    setExecuted(false);
    setInputVal('5');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl text-slate-100">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Terminal className="w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Sanal Java Konsol Terminali
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Enes Öztürk&apos;ün Java kodunun konsol ekranındaki gerçek çalışma simülasyonu.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-slate-950 px-3 py-1 rounded-md text-cyan-400 border border-slate-800">
            OpenJDK 21 / JVM Runtime
          </span>
        </div>
      </div>

      {/* Terminal Input Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-5">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Java Scanner Simülasyon Girişi:
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full flex items-center bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
            <span className="text-cyan-400 font-mono text-sm mr-2">&gt;</span>
            <input
              type="number"
              min="1"
              max="50000"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') runSimulation();
              }}
              className="bg-transparent w-full text-white font-mono text-sm focus:outline-none"
              placeholder="Bir sayı girin (örn. 8)..."
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => runSimulation()}
              disabled={isRunning}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Java&apos;yı Çalıştır</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all border border-slate-700"
              title="Konsolu Temizle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick test buttons */}
        <div className="flex items-center gap-2 mt-3 text-xs text-slate-400 flex-wrap">
          <span className="text-[11px] text-slate-500">Hazır Denemeler:</span>
          {[3, 5, 8, 10, 20, 100].map((testVal) => (
            <button
              key={testVal}
              onClick={() => {
                setInputVal(testVal.toString());
                runSimulation(testVal.toString());
              }}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-xs font-mono border border-slate-800 hover:border-slate-700 transition-colors"
            >
              n = {testVal}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Window */}
      <div className="bg-black/90 rounded-xl border border-slate-800 overflow-hidden shadow-2xl font-mono text-xs">
        {/* Terminal Titlebar */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span className="text-slate-400 text-xs ml-2">bash - HarmonikSeri.java [Enes Öztürk]</span>
          </div>
          <span className="text-[10px] text-slate-500">UTF-8</span>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-6 min-h-[260px] max-h-[380px] overflow-y-auto space-y-1 scrollbar-thin">
          {!executed ? (
            <div className="text-slate-500 text-xs space-y-2 py-4">
              <p className="text-cyan-400 font-semibold">$ # Java Harmonik Seri Programı Sanal Konsolu</p>
              <p>Yukarıdaki &quot;Java&apos;yı Çalıştır&quot; butonuna basarak programı test edebilirsiniz.</p>
              <p className="text-slate-600">// Program Scanner ile girdi alır ve ekrana adım adım harmonik toplamı basar.</p>
            </div>
          ) : (
            outputLines.map((line, idx) => {
              const isCommand = line.startsWith('$');
              const isHeader = line.includes('HARMONİK SERİ') || line.includes('===');
              const isResult = line.startsWith('Sonuç:');
              const isAuthor = line.includes('Enes Öztürk');
              const isStep = line.startsWith('Adım');
              const isError = line.startsWith('Hata:');

              return (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    isCommand
                      ? 'text-cyan-300 font-bold'
                      : isHeader
                      ? 'text-indigo-300 font-semibold'
                      : isResult
                      ? 'text-emerald-400 font-bold text-sm bg-emerald-950/30 px-2 py-1 rounded inline-block'
                      : isAuthor
                      ? 'text-amber-300 font-semibold'
                      : isError
                      ? 'text-rose-400 font-bold'
                      : isStep
                      ? 'text-slate-300'
                      : 'text-slate-400'
                  }`}
                >
                  {line}
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
};
