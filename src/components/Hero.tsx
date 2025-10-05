import { Wrench } from 'lucide-react';

interface HeroProps {
  onScrollToForm: () => void;
}

export function Hero({ onScrollToForm }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-6 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8 flex md:justify-start justify-center">
              <div className="bg-orange-500 p-4 rounded-full">
                <Wrench size={48} className="text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight md:text-left text-center">
              Sanayimden'e Katıl – Yeni Müşteriler Seni Bekliyor!
            </h1>

            <p className="text-xl text-gray-300 mb-10 leading-relaxed md:text-left text-center">
              Binlerce araç sahibine ulaşarak işlerinizi büyütün, müşteri ağınızı genişletin. Uygulamamıza kayıt olarak hizmetlerinizi sergileyebilir, konumunuza en yakın araç sahipleriyle buluşabilirsiniz.
            </p>

            <div className="flex md:justify-start justify-center">
              <button
                onClick={onScrollToForm}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-10 py-4 rounded-lg shadow-lg transition-all transform hover:scale-105"
              >
                Ücretsiz Kaydol
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <img
              src="https://images.pexels.com/photos/3964736/pexels-photo-3964736.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Mechanic working"
              className="rounded-2xl shadow-2xl object-cover w-full h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
