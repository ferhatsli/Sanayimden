import { UserPlus, Eye, Handshake } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Kaydol',
      description: 'Formu doldur, hesabını aç'
    },
    {
      icon: Eye,
      title: 'İlanları Gör',
      description: 'Yakındaki araç sahiplerini keşfet'
    },
    {
      icon: Handshake,
      title: 'Teklif Ver & İş Al',
      description: 'Müşteri kabul etsin, işine başla'
    }
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">
          Nasıl Çalışır?
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Üç basit adımda işe başla
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-slate-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {index + 1}
              </div>
              <div className="bg-orange-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <step.icon size={40} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
