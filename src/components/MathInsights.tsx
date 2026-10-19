import React from 'react';
import { Sparkles, HelpCircle, Layers, CheckCircle, Lightbulb } from 'lucide-react';

export const MathInsights: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl text-slate-100">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Harmonik Serinin Büyülü Dünyası & Matematiksel İspatlar
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Neden ıraksar? Nerede kullanılır? Enes Öztürk derlemesi.
          </p>
        </div>

        <span className="text-xs bg-purple-500/10 text-purple-300 font-semibold px-3 py-1 rounded-full border border-purple-500/30">
          Matematik & Algoritmalar
        </span>
      </div>

      <div className="space-y-6">
        
        {/* Section 1: Oresme's Famous Proof */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 md:p-6">
          <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">1</span>
            Harmonik Seri Neden Sonsuza Ulaşır? (Nicole Oresme İspatı - 1350)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            İlk bakışta eklenen her terim giderek küçüldüğü için (1/2, 1/3, 1/4...) toplamın sabit bir sayıya durulacağı sanılabilir. 
            Ancak 14. yüzyılda matematikçi <strong>Nicole Oresme</strong>, terimleri 2&apos;nin kuvvetleri şeklinde gruplayarak serinin sonsuza gittiğini harika bir şekilde ispatlamıştır:
          </p>

          {/* Proof Visual Block */}
          <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-4 font-mono text-xs sm:text-sm space-y-3">
            <div className="text-slate-300">
              H = 1 + <span className="text-amber-400 font-bold">(1/2)</span> + <span className="text-indigo-400 font-bold">(1/3 + 1/4)</span> + <span className="text-emerald-400 font-bold">(1/5 + 1/6 + 1/7 + 1/8)</span> + ...
            </div>

            <div className="text-slate-400 text-xs border-t border-slate-800 pt-2 space-y-1">
              <div>• 1/3 &gt; 1/4 olduğuna göre: <span className="text-indigo-300 font-semibold">(1/3 + 1/4) &gt; (1/4 + 1/4) = 1/2</span></div>
              <div>• 1/5, 1/6, 1/7 &gt; 1/8 olduğuna göre: <span className="text-emerald-300 font-semibold">(1/5 + 1/6 + 1/7 + 1/8) &gt; 4 × (1/8) = 1/2</span></div>
              <div>• Bir sonraki 8 terim toplamı da &gt; <span className="text-cyan-300 font-semibold">8 × (1/16) = 1/2</span> olacaktır!</div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded text-amber-300 font-bold text-center border border-slate-800">
              Dolayısıyla: H &gt; 1 + 1/2 + 1/2 + 1/2 + 1/2 + ... = ∞ (Iraksak)
            </div>
          </div>
        </div>

        {/* Section 2: Real World & Computer Science Applications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card A: Kitap Yığma Problemi */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">
              Kitap Dengeleme Problemi
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Masanın kenarından üst üste konulan özdeş kitapların devrilmeden ne kadar dışarı taşabileceği harmonik seriye bağlıdır. 
              En üstteki kitap L/2 kadar, ikincisi L/4 kadar sarkar. Yeterince kitapla masa kenarından istenilen mesafede çıkıntı yapılabilir!
            </p>
          </div>

          {/* Card B: Kupon Toplayıcı Problemi */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">
              Kupon Toplayıcı Problemi
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cips paketlerinden çıkan <em>n</em> farklı futbolcu kartının hepsini tamamlamak için ortalama kaç paket açılması gerekir?
              Cevap: Tam olarak <strong>n · H<sub>n</sub> ≈ n · ln(n)</strong> pakettir.
            </p>
          </div>

          {/* Card C: Quicksort Algoritması */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">
              Quicksort Karmaşıklığı
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bilgisayar mühendisliğinin temel sıralama algoritması olan Quicksort&apos;un ortalama çalışma süresinde yapılan karşılaştırma sayısı 
              <strong> 2n · H<sub>n</sub> ≈ 2n ln(n)</strong> formülüyle tam hesaplanır.
            </p>
          </div>

        </div>

        {/* Section 3: Java Checklist */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Java Ödev & Sınav Kontrol Listesi
          </h3>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Değişken Tipi:</strong> Toplam değişkeni mutlaka <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300">double</code> tanımlanmalıdır.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Bölme İşlemi:</strong> <code className="bg-slate-900 px-1 py-0.5 rounded text-rose-300">1 / i</code> yerine <code className="bg-slate-900 px-1 py-0.5 rounded text-emerald-300">1.0 / i</code> yazılmalıdır.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Döngü Başlangıcı:</strong> <code className="bg-slate-900 px-1 py-0.5 rounded text-indigo-300">i = 1</code>&apos;den başlamalıdır; 0&apos;dan başlarsa <code className="text-rose-400">1 / 0</code> tanımsızlık hatası (Infinity) oluşur.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Kaynak Kapatma:</strong> Scanner nesnesi işi bittikten sonra <code className="bg-slate-900 px-1 py-0.5 rounded text-cyan-300">scanner.close()</code> ile kapatılarak bellek sızıntısı önlenmelidir.</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};
