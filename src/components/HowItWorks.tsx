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
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Nasıl Çalışır?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Üç basit adımda işe başla
            </p>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-slate-900 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <step.icon size={24} className="text-orange-600" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/4489765/pexels-photo-4489765.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Mechanic using app"
              className="rounded-2xl shadow-2xl object-cover w-full h-[450px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
