import React, { useState } from 'react';
import { JAVA_SNIPPETS } from '../data/javaSnippets';
import { JavaImplementationType } from '../types';
import {
  Code2,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Lightbulb,
  FileCode,
  ShieldCheck,
  Play,
} from 'lucide-react';

interface JavaCodeViewerProps {
  onOpenTerminal?: () => void;
}

export const JavaCodeViewer: React.FC<JavaCodeViewerProps> = ({ onOpenTerminal }) => {
  const [selectedId, setSelectedId] = useState<JavaImplementationType>('loop');
  const [copied, setCopied] = useState(false);

  const activeSnippet =
    JAVA_SNIPPETS.find((s) => s.id === selectedId) || JAVA_SNIPPETS[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const filename = `${
      activeSnippet.id === 'loop'
        ? 'HarmonikSeri'
        : activeSnippet.id === 'fraction'
        ? 'HarmonikKesir'
        : activeSnippet.id === 'recursive'
        ? 'HarmonikRecursive'
        : 'HarmonikStream'
    }.java`;

    const blob = new Blob([activeSnippet.code], { type: 'text/x-java-source' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Code2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Java Harmonik Seri Programı
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Enes Öztürk imzalı, eksiksiz, derlenebilir ve açıklamalı Java kaynak kodları.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            Enes Öztürk İmzalı
          </span>
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Simülatörde Çalıştır</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {JAVA_SNIPPETS.map((snippet) => (
          <button
            key={snippet.id}
            onClick={() => setSelectedId(snippet.id)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
              selectedId === snippet.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <FileCode className="w-4 h-4 text-indigo-300" />
            <span>{snippet.title}</span>
          </button>
        ))}
      </div>

      {/* Active Snippet Description & Actions Bar */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-t-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-semibold text-white">{activeSnippet.subtitle}</span>
          <p className="text-slate-400 text-[11px] mt-0.5">{activeSnippet.description}</p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium flex items-center gap-1.5 transition-all"
            title="Dosyayı .java olarak indir"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">İndir (.java)</span>
          </button>
        </div>
      </div>

      {/* Code Box with Syntax Highlighting Look */}
      <div className="bg-slate-950 border border-t-0 border-slate-800 rounded-b-xl p-4 overflow-x-auto max-h-[500px] scrollbar-thin">
        <pre className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
          <code>
            {activeSnippet.code.split('\n').map((line, idx) => {
              const isComment =
                line.trim().startsWith('//') ||
                line.trim().startsWith('/*') ||
                line.trim().startsWith('*');
              const isEnesOzturk = line.includes('Enes Öztürk');
              const isImportantWarning = line.includes('DİKKAT: 1 / i');

              return (
                <div
                  key={idx}
                  className={`table-row ${
                    isEnesOzturk
                      ? 'bg-amber-500/10'
                      : isImportantWarning
                      ? 'bg-rose-500/10'
                      : ''
                  }`}
                >
                  <span className="table-cell select-none text-right pr-4 text-slate-600 text-xs w-8">
                    {idx + 1}
                  </span>
                  <span
                    className={`table-cell ${
                      isEnesOzturk
                        ? 'text-amber-300 font-semibold'
                        : isImportantWarning
                        ? 'text-rose-400 font-bold'
                        : isComment
                        ? 'text-slate-500 italic'
                        : 'text-slate-200'
                    }`}
                  >
                    {line}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>

      {/* Crucial Programming Pitfall Warning */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Warning 1: Integer Division */}
        <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h4 className="font-bold text-rose-300 mb-1">
              Java&apos;da En Sık Yapılan Hata: Tamsayı Bölmesi (1 / i)
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Java&apos;da iki tamsayı bölündüğünde sonuç da tamsayı olur. Eğer kodunuzda{' '}
              <code className="bg-slate-900 px-1 py-0.5 rounded text-rose-300 font-mono font-bold">1 / i</code>{' '}
              yazarsanız, <code className="text-rose-300">i &gt; 1</code> olduğu her adımda sonuç{' '}
              <strong>0</strong> çıkar ve toplam yanlış (sadece 1.0) kalır!
            </p>
            <p className="text-emerald-300 font-semibold mt-2">
              Çözüm: Kesinlikle <code className="bg-slate-900 px-1 py-0.5 rounded text-emerald-300 font-mono">1.0 / i</code> veya{' '}
              <code className="bg-slate-900 px-1 py-0.5 rounded text-emerald-300 font-mono">(double) 1 / i</code> kullanınız.
            </p>
          </div>
        </div>

        {/* Note 2: Scanner & Execution */}
        <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-4 flex gap-3">
          <Lightbulb className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h4 className="font-bold text-indigo-300 mb-1">
              Java&apos;da Nasıl Derlenir ve Çalıştırılır?
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Terminal veya komut satırından çalıştırmak için:
            </p>
            <div className="bg-slate-950 p-2 rounded font-mono text-[11px] text-cyan-300 my-1 border border-slate-800">
              javac HarmonikSeri.java<br />
              java HarmonikSeri
            </div>
            <p className="text-slate-400 text-[11px]">
              Eclipse, IntelliJ IDEA veya VS Code editörlerinde projeye yapıştırıp doğrudan <kbd className="bg-slate-800 px-1 py-0.5 rounded">Run</kbd> tuşuna basabilirsiniz.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
