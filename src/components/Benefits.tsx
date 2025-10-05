import { MapPin, CreditCard, TrendingUp, Search } from 'lucide-react';

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
      icon: Search,
      title: 'Yedek Parça Bul',
      description: 'Kolayca ara, fiyat karşılaştır, hemen ulaş'
    }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Neden Sanayimden?
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            🔧 Yedek parça arama derdine son! Sanayimden.com'da ihtiyacın olan parçayı kolayca bul, fiyatları karşılaştır, en uygun tedarikçiye hemen ulaş. Tedariğin aksamadan, işlerin hız kesmeden devam etsin!
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <img
              src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Auto repair shop"
              className="rounded-xl shadow-lg object-cover h-48 w-full"
            />
            <img
              src="https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Car parts"
              className="rounded-xl shadow-lg object-cover h-48 w-full"
            />
            <img
              src="https://images.pexels.com/photos/4489743/pexels-photo-4489743.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Mechanic tools"
              className="rounded-xl shadow-lg object-cover h-48 w-full"
            />
          </div>
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
