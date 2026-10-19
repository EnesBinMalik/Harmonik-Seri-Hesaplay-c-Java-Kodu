import { JavaCodeSnippet } from '../types';

export const JAVA_SNIPPETS: JavaCodeSnippet[] = [
  {
    id: 'loop',
    title: 'Standart Döngü (Scanner)',
    subtitle: 'En çok tercih edilen, adım adım for döngüsü ile çözüm',
    description:
      'Kullanıcıdan Scanner sınıfı ile n sayısını alır. Bir for döngüsü içerisinde 1.0 / i değerlerini toplayarak sonucu ekrana yazdırır.',
    code: `import java.util.Scanner;

/**
 * =========================================================
 * Proje: Girilen Sayının Harmonik Serisini Bulan Program
 * Yazar: Enes Öztürk
 * Tarih: 2026
 * Açıklama: Harmonik Seri Formülü: H(n) = 1 + 1/2 + 1/3 + ... + 1/n
 * =========================================================
 */
public class HarmonikSeri {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("  HARMONİK SERİ HESAPLAMA PROGRAMI - ENES ÖZTÜRK  ");
        System.out.println("==================================================");

        // Kullanıcıdan pozitif bir tamsayı alma
        System.out.print("Lütfen bir n sayısı giriniz: ");
        int n = scanner.nextInt();

        // Giriş doğrulaması
        if (n <= 0) {
            System.out.println("Hata: Lütfen 0'dan büyük pozitif bir tam sayı giriniz!");
            scanner.close();
            return;
        }

        // Toplam değişkeni (double tipinde olmalı)
        double toplam = 0.0;

        System.out.println("\\n--- Adım Adım Hesaplama ---");
        for (int i = 1; i <= n; i++) {
            // DİKKAT: 1 / i yazılırsa tamsayı bölmesi olur ve sonuç 0 çıkar!
            // Bu yüzden 1.0 / i veya (double) 1 / i kullanılmalıdır.
            double terim = 1.0 / i;
            toplam += terim;
            
            if (i <= 10 || i == n) {
                System.out.printf("Adım %2d: 1/%-2d = %.6f  -->  Kümülatif Toplam: %.6f%n", 
                                  i, i, terim, toplam);
            } else if (i == 11) {
                System.out.println("... (ara adımlar hesaplanıyor) ...");
            }
        }

        System.out.println("--------------------------------------------------");
        System.out.printf("Sonuç: H(%d) = %.8f%n", n, toplam);
        System.out.println("==================================================");
        System.out.println("Program sonlandı. Geliştirici: Enes Öztürk");

        scanner.close();
    }
}`,
  },
  {
    id: 'fraction',
    title: 'Tam Kesirli Hesaplama (BigInteger)',
    subtitle: 'Hassasiyet kaybı olmadan rasyonel kesir (Pay / Payda) hesabı',
    description:
      'BigInteger kullanarak pay ve payda üzerinden kesirli toplama yapar ve EBOB (GCD) ile sadeleştirilmiş tam kesri verir.',
    code: `import java.math.BigInteger;
import java.util.Scanner;

/**
 * =========================================================
 * Proje: Harmonik Seri Tam Kesirli (Rasyonel) Hesaplayıcı
 * Yazar: Enes Öztürk
 * Formül: H(n) = ∑ (1 / k) [Pay / Payda olarak tam sonuç]
 * =========================================================
 */
public class HarmonikKesir {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Pozitif n sayısını giriniz: ");
        int n = scanner.nextInt();

        if (n <= 0) {
            System.out.println("Lütfen pozitif bir sayı giriniz!");
            scanner.close();
            return;
        }

        BigInteger pay = BigInteger.ONE;
        BigInteger payda = BigInteger.ONE;

        for (int i = 2; i <= n; i++) {
            BigInteger yeniPayda = BigInteger.valueOf(i);
            
            // pay/payda + 1/i = (pay * i + payda) / (payda * i)
            pay = pay.multiply(yeniPayda).add(payda);
            payda = payda.multiply(yeniPayda);

            // Sadeleştirme: EBOB (Greatest Common Divisor)
            BigInteger ebob = pay.gcd(payda);
            pay = pay.divide(ebob);
            payda = payda.divide(ebob);
        }

        System.out.println("\\n--- Enes Öztürk Kesirli Hesaplama Sonucu ---");
        System.out.println("H(" + n + ") Tam Kesirli Hali : " + pay + " / " + payda);
        
        double ondalik = pay.doubleValue() / payda.doubleValue();
        System.out.printf("H(%d) Yaklaşık Ondalık Hali: %.10f%n", n, ondalik);

        scanner.close();
    }
}`,
  },
  {
    id: 'recursive',
    title: 'Özyinelemeli (Recursive)',
    subtitle: 'Matematiksel tanıma dayalı rekürsif fonksiyon çözümü',
    description:
      'H(1) = 1 ve H(n) = 1/n + H(n-1) rekürsif bağıntısını kullanarak hesaplar.',
    code: `import java.util.Scanner;

/**
 * =========================================================
 * Proje: Harmonik Seri Recursive (Özyinelemeli) Çözüm
 * Yazar: Enes Öztürk
 * Bağıntı: H(n) = 1/n + H(n - 1),  H(1) = 1
 * =========================================================
 */
public class HarmonikRecursive {

    // Özyinelemeli harmonik toplam fonksiyonu
    public static double harmonikHesapla(int n) {
        // Temel Durum (Base Case)
        if (n <= 1) {
            return 1.0;
        }
        // Özyinelemeli Çağrı (Recursive Call)
        return (1.0 / n) + harmonikHesapla(n - 1);
    }

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("n değerini girin: ");
        int n = input.nextInt();

        if (n > 0) {
            double sonuc = harmonikHesapla(n);
            System.out.printf("H(%d) = %.6f (Enes Öztürk)%n", n, sonuc);
        } else {
            System.out.println("Lütfen n > 0 bir değer girin!");
        }

        input.close();
    }
}`,
  },
  {
    id: 'stream',
    title: 'Modern Java Streams (Java 8+)',
    subtitle: 'Fonksiyonel programlama ve tek satırlık akış yaklaşımı',
    description:
      'Java 8 IntStream.rangeClosed kullanarak fonksiyonel akış ile harmonik seriyi hesaplar.',
    code: `import java.util.Scanner;
import java.util.stream.IntStream;

/**
 * =========================================================
 * Proje: Fonksiyonel Java Streams ile Harmonik Seri
 * Yazar: Enes Öztürk
 * Teknoloji: Java 8+ IntStream & mapToDouble
 * =========================================================
 */
public class HarmonikStream {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.print("n sayısını giriniz: ");
        int n = scan.nextInt();

        if (n > 0) {
            // 1'den n'e kadar akış oluşturup 1.0 / i dönüştür ve topla
            double harmonikToplam = IntStream.rangeClosed(1, n)
                                             .mapToDouble(i -> 1.0 / i)
                                             .sum();

            System.out.printf("Stream Sonucu H(%d) = %.8f%n", n, harmonikToplam);
            System.out.println("Tasarım: Enes Öztürk");
        }

        scan.close();
    }
}`,
  },
];
