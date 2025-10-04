import { MapPin, CreditCard, TrendingUp, Clock } from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      icon: MapPin,
      title: 'Yakındaki Müşteriler',
      description: 'Bölgendeki araç sahiplerine ulaş'
    },
    {
      icon: CreditCard,
      title: 'Ödemeni Kendi Al',
      description: 'Direkt müşteriyle anlaş'
    },
    {
      icon: TrendingUp,
      title: 'Yeni Müşteri Kazan',
      description: 'İş ağını sürekli büyüt'
    },
    {
      icon: Clock,
      title: 'İşini Hızlı Büyüt',
      description: 'Daha çok iş, daha çok kazanç'
    }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Neden Sanayimden?
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            🔧 Yedek parça arama derdine son! Sanayimden.com'da ihtiyacın olan parçayı kolayca bul, fiyatları karşılaştır, en uygun tedarikçiye hemen ulaş. Tedariğin aksamadan, işlerin hız kesmeden devam etsin!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon size={28} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
