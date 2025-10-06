import { Check } from 'lucide-react';

type PricingPackagesProps = {
  onSelectPackage?: (id: '1' | '3' | '6') => void;
};

export function PricingPackages({ onSelectPackage }: PricingPackagesProps) {
  const packages = [
    {
      id: '1' as const,
      duration: '1 Aylık',
      price: '199.90',
      popular: false
    },
    {
      id: '3' as const,
      duration: '3 Aylık',
      price: '499.90',
      popular: true
    },
    {
      id: '6' as const,
      duration: '6 Aylık',
      price: '899.90',
      popular: false
    }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Üyelik Paketleri
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            İşletmenize en uygun paketi seçin, binlerce müşteriye ulaşmaya başlayın
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 overflow-hidden ${
                pkg.popular ? 'ring-4 ring-orange-500 relative' : ''
              }`}
            >
              {pkg.popular && (
                <div className="bg-orange-500 text-white text-center py-2 font-bold text-sm">
                  EN POPÜLER
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2 text-center">
                  {pkg.duration}
                </h3>

                <div className="text-center mb-6">
                  <span className="text-5xl font-bold text-orange-600">{pkg.price}</span>
                  <span className="text-xl text-gray-600 ml-2">TL</span>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Sınırsız ilan görüntüleme</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Müşterilere teklif gönderme</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Konum bazlı müşteri bulma</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Profil yönetimi</span>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => {
                      onSelectPackage?.(pkg.id);
                    }}
                    className={`w-full font-bold text-lg px-6 py-3 rounded-lg shadow-md transition-all transform hover:scale-105 ${
                      pkg.popular
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    Hemen Başla
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
