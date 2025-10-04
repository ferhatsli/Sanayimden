import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, Loader2 } from 'lucide-react';

export function SignupForm() {
  const [fullName, setFullName] = useState('');
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: submitError } = await supabase
        .from('mechanic_signups')
        .insert([
          {
            full_name: fullName,
            shop_name: shopName,
            phone: phone
          }
        ]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFullName('');
      setShopName('');
      setPhone('');
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section id="signup-form" className="py-16 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center">
            <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Başvurunuz Alındı!</h3>
            <p className="text-gray-700">
              Başvurunuz onaylandıktan sonra size geri dönüş yapılacaktır.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="signup-form" className="py-16 px-6 bg-white">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">
          Usta Kayıt Formu
        </h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Hemen başvur, yeni müşterilere ulaş
        </p>

        <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl shadow-lg">
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
