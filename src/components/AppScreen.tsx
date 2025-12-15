
import { useEffect, useRef, useState } from 'react';

export function AppScreens() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [mastersCount, setMastersCount] = useState(0);
  const [membersCount, setMembersCount] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);

  // Start animation when section becomes visible (mobile/desktop)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const triggerOnce = () => setStatsStarted((prev) => prev || true);

    const isVisibleNow = () => {
      const rect = el.getBoundingClientRect();
      const viewHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewWidth = window.innerWidth || document.documentElement.clientWidth;
      const verticalVisible = rect.top <= viewHeight * 0.85 && rect.bottom >= viewHeight * 0.15;
      const horizontalVisible = rect.left <= viewWidth && rect.right >= 0;
      return verticalVisible && horizontalVisible;
    };

    if (isVisibleNow()) {
      triggerOnce();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          triggerOnce();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -20% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsStarted) return;

    const animateValue = (target: number, setter: (val: number) => void, duration = 1200) => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setter(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    animateValue(1000, setMastersCount, 1100);
    animateValue(5000, setMembersCount, 1400);
  }, [statsStarted]);

  const formatNumber = (n: number) => new Intl.NumberFormat('tr-TR').format(n);

  const screens = [
    {
      src: '/detay.png',
      alt: 'İlan Detay Sayfası',
      title: 'İlan Detay',
      description: 'Araç sahibinin ilan detaylarını görüntüle'
    },
    {
      src: '/usta-liste.png',
      alt: 'Usta Listesi Sayfası',
      title: 'Usta Listesi',
      description: 'Yakındaki ustaları listele, tekliflerini incele'
    },
    {
      src: '/arabanin-nesi-var.png',
      alt: 'Arabanın Nesi Var Sayfası',
      title: 'Arabanın Nesi Var',
      description: 'Kullanıcıların sorunlarını kolayca bildirdiği alan'
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 px-6 bg-gradient-to-br from-white to-slate-50">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex flex-col items-center gap-4 mb-12">
          <h3 className="text-3xl md:text-4xl font-extrabold text-orange-600 tracking-tight -mt-4">
            Sanayimden Tanıtım Videosu
          </h3>
          <div className="w-full max-w-2xl aspect-square overflow-hidden rounded-2xl shadow-2xl border border-gray-200 bg-black/90">
            <video
              src="/ads_video.mp4"
              className="w-full h-full object-cover"
              controls
              playsInline
              muted
              loop
            >
              Tarayıcınız video etiketini desteklemiyor.
            </video>
          </div>
        </div>

        <div className="relative mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200/50 via-white to-slate-200/50 blur-3xl -z-10" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="backdrop-blur bg-white/80 border border-orange-200 shadow-xl rounded-2xl px-6 py-4 min-w-[230px]">
              <p className="text-sm uppercase tracking-wide text-orange-600 font-semibold mb-1">Kayıtlı Usta</p>
              <div className="flex items-end justify-center gap-1">
                <span className="text-4xl font-black text-slate-900">{formatNumber(mastersCount)}</span>
                <span className="text-2xl font-bold text-orange-600">+</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Türkiye genelinde güvenilir usta</p>
            </div>

            <div className="backdrop-blur bg-slate-900/90 border border-slate-700 shadow-xl rounded-2xl px-6 py-4 min-w-[230px]">
              <p className="text-sm uppercase tracking-wide text-orange-200 font-semibold mb-1">Toplam Üye</p>
              <div className="flex items-end justify-center gap-1">
                <span className="text-4xl font-black text-white">{formatNumber(membersCount)}</span>
                <span className="text-2xl font-bold text-orange-300">+</span>
              </div>
              <p className="text-sm text-slate-200 mt-1">Sanayimden'e kayıtlı araç sahibi</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
          Uygulamadan Görüntüler
        </h2>
        <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
          Sanayimden.com'un kolay arayüzüyle ilanları yönet, ustalarla buluş, yeni müşteriler kazan!
        </p>

        {/* Görseller grid yapısında */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {screens.map((screen, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 p-4 flex flex-col items-center"
            >
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-inner w-full">
                <img
                  src={screen.src}
                  alt={screen.alt}
                  className="object-cover w-full h-auto rounded-xl"
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mt-4">
                {screen.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mt-1">
                {screen.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
