import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, Loader2, AlertTriangle, CreditCard } from 'lucide-react';

export function SignupForm() {
  const [fullName, setFullName] = useState('');
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('3');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const packages = [
    { id: '1', duration: '1 Aylık', price: '199.90' },
    { id: '3', duration: '3 Aylık', price: '499.90' },
    { id: '6', duration: '6 Aylık', price: '899.90' }
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const selectedPkg = packages.find(p => p.id === selectedPackage);

      const { error: submitError } = await supabase
        .from('mechanic_signups')
        .insert([
          {
            full_name: fullName,
            shop_name: shopName,
            phone: phone,
            package_duration: selectedPkg?.duration,
            package_price: selectedPkg?.price
          }
        ]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFullName('');
      setShopName('');
      setPhone('');
      setSelectedPackage('3');
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    const selectedPkg = packages.find(p => p.id === selectedPackage);

    return (
      <section id="signup-form" className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center mb-6">
            <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Başvurunuz Alındı!</h3>
            <p className="text-gray-700 text-lg mb-6">
              Seçtiğiniz paket: <strong>{selectedPkg?.duration}</strong> - <strong>{selectedPkg?.price} TL</strong>
            </p>
          </div>

          <div className="bg-orange-50 border-2 border-orange-500 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-6">
              <CreditCard size={32} className="text-orange-600 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Ödeme Bilgileri</h4>
                <p className="text-gray-700 mb-4">
                  Üyeliğinizin aktif olması için lütfen aşağıdaki hesaba ödeme yapınız:
                </p>
                <div className="bg-white rounded-lg p-4 border-2 border-orange-300">
                  <p className="font-mono text-lg font-bold text-slate-900 mb-2">TR61 0004 6000 4088 8000 2198 51</p>
                  <p className="text-gray-700 font-semibold">Raif Kızılaslanoğlu</p>
                  <p className="text-orange-600 font-bold mt-2 text-xl">Tutar: {selectedPkg?.price} TL</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle size={24} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-semibold mb-1">ÖNEMLİ UYARI:</p>
                <p className="text-red-700 text-sm leading-relaxed">
                  Ödeme yapılmadan üyelik aktif olmayacaktır. Kayıt olduktan sonra 48 saat içinde ödeme yapılmazsa başvurunuz otomatik olarak silinecektir. Ödeme yaptıktan sonra dekont/makbuzunuzu WhatsApp üzerinden bize iletiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="signup-form" className="py-16 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">
          Usta Kayıt Formu
        </h2>
        <p className="text-center text-gray-600 text-lg mb-8">
          Hemen başvur, yeni müşterilere ulaş
        </p>

        <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl shadow-lg">
          <div className="mb-6">
            <label className="block text-slate-900 font-semibold mb-4 text-lg">
              Paket Seçimi
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {packages.map((pkg) => (
                <label
                  key={pkg.id}
                  className={`cursor-pointer rounded-xl p-3 sm:p-4 border-2 transition-all ${
                    selectedPackage === pkg.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-300 bg-white hover:border-orange-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="package"
                    value={pkg.id}
                    checked={selectedPackage === pkg.id}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="font-bold text-slate-900 mb-1 text-sm sm:text-base">{pkg.duration}</div>
                    <div className="text-xl sm:text-2xl font-bold text-orange-600 whitespace-nowrap">{pkg.price} TL</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="fullName" className="block text-slate-900 font-semibold mb-2 text-lg">
              Ad Soyad
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="Örn: Mehmet Yılmaz"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="shopName" className="block text-slate-900 font-semibold mb-2 text-lg">
              Dükkan Adı
            </label>
            <input
              type="text"
              id="shopName"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              required
              className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="Örn: Yılmaz Oto Tamir"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-slate-900 font-semibold mb-2 text-lg">
              Telefon Numarası
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="Örn: 0555 123 45 67"
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={24} />
                Gönderiliyor...
              </>
            ) : (
              'Hemen Başvur'
            )}
          </button>

          <p className="text-sm text-gray-500 text-center mt-4 leading-relaxed">
            Başvurunuz onaylandıktan sonra size geri dönüş yapılacaktır.
          </p>
        </form>
      </div>
    </section>
  );
}
