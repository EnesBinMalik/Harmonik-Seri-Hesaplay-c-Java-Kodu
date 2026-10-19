/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { FormulaCard } from './components/FormulaCard';
import { Calculator } from './components/Calculator';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { JavaTerminalSimulator } from './components/JavaTerminalSimulator';
import { MathInsights } from './components/MathInsights';
import { Footer } from './components/Footer';
import {
  Code2,
  Terminal,
  Sigma,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('calculator');
  const [sharedN, setSharedN] = useState<number>(5);

  const handleSendToJava = (val: number) => {
    setSharedN(val);
    setActiveTab('terminal');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleOpenTerminal = () => {
    setActiveTab('terminal');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header with Enes Öztürk Signature */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero & Mathematical Formula Section (Always visible or primary) */}
        <section aria-label="Harmonik Seri Formülü">
          <FormulaCard />
        </section>

        {/* Dynamic Tabbed Content */}
        {activeTab === 'calculator' && (
          <div className="space-y-8">
            <Calculator onSendToJava={handleSendToJava} />
            
            {/* Quick Teaser for Java Code */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                  Bu Algoritmanın Java Kaynak Kodları Hazır!
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Enes Öztürk tarafından hazırlanan Scanner döngülü, kesirli BigInteger ve özyinelemeli Java çözümlerini inceleyin.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('java')}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-indigo-600/30 whitespace-nowrap"
              >
                <span>Java Kodlarını Görüntüle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'java' && (
          <div className="space-y-8">
            <JavaCodeViewer onOpenTerminal={handleOpenTerminal} />
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="space-y-8">
            <JavaTerminalSimulator initialN={sharedN} />
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-8">
            <MathInsights />
          </div>
        )}

        {/* Quick jump bar when not on calculator */}
        {activeTab !== 'calculator' && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                setActiveTab('calculator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs text-slate-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
            >
              <Sigma className="w-3.5 h-3.5" />
              <span>İnteraktif Hesaplayıcıya Geri Dön</span>
            </button>
          </div>
        )}

      </main>

      {/* Footer with Enes Öztürk Signature */}
      <Footer />
    </div>
  );
}
