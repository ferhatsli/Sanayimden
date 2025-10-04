import { Wrench } from 'lucide-react';

interface HeroProps {
  onScrollToForm: () => void;
}

export function Hero({ onScrollToForm }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-6 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="bg-orange-500 p-4 rounded-full">
            <Wrench size={48} className="text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Sanayimden'e Katıl – Yeni Müşteriler Seni Bekliyor!
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          Binlerce araç sahibine ulaşarak işlerinizi büyütün, müşteri ağınızı genişletin. Uygulamamıza kayıt olarak hizmetlerinizi sergileyebilir, konumunuza en yakın araç sahipleriyle buluşabilirsiniz. Güvenilir bir platformda yerinizi alın, sanayideki emeğiniz dijital dünyada da görünür olsun!
        </p>

        <button
          onClick={onScrollToForm}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-10 py-4 rounded-lg shadow-lg transition-all transform hover:scale-105"
        >
          Ücretsiz Kaydol
        </button>
      </div>
    </section>
  );
}
