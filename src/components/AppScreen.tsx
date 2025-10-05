import Image from 'next/image';

export function AppScreens() {
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
    <section className="py-16 px-6 bg-gradient-to-br from-white to-slate-50">
      <div className="max-w-6xl mx-auto text-center">
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
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={300}
                  height={600}
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