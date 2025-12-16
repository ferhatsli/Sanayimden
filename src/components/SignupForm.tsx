import { useState, FormEvent } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { supabase } from '../lib/supabase';
import { CheckCircle, Loader2, AlertTriangle, CreditCard, Copy, Check } from 'lucide-react';

type SignupFormProps = {
  selectedPackage: '1' | '3' | '6';
  setSelectedPackage: (id: '1' | '3' | '6') => void;
};

export function SignupForm({ selectedPackage, setSelectedPackage }: SignupFormProps) {
  const [fullName, setFullName] = useState('');
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState<string | null>(null);
  
  // Yardımcı: Farklı giriş biçimlerini yerel TR formatına çevirir.
  // "+90 505 ...", "90505 ...", "505 ..." -> "0505..." (11 hane)
  const toLocalTRPhone = (raw: string) => {
    const digits = (raw || '').replace(/\D/g, '');
    // Son 10 haneyi al (ülke kodu vb. at)
    const last10 = digits.slice(-10);
    if (last10.length !== 10) return '';
    return `0${last10}`;
  };

  const onPhoneChange = (value: string) => {
    // Sadece rakam kabul et; 11 haneyle sınırla
    const onlyDigits = value.replace(/\D/g, '').slice(0, 11);
    setPhone(onlyDigits);
  };
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [copiedIban, setCopiedIban] = useState(false);
  const [copiedName, setCopiedName] = useState(false);
  const [submittedInfo, setSubmittedInfo] = useState<{
    fullName: string;
    shopName: string;
    phone: string;
    packageDuration?: string;
    packagePrice?: string;
  } | null>(null);
  const isTurnstileEnabled = Boolean(import.meta.env.VITE_TURNSTILE_SITE_KEY);

  const packages = [
    { id: '1', duration: '1 Aylık', price: '199.90' },
    { id: '3', duration: '3 Aylık', price: '499.90' },
    { id: '6', duration: '6 Aylık', price: '899.90' }
  ];

  const iban = 'TR61 0004 6000 4088 8000 2198 51';
  const accountName = 'Raif Kızılaslanoğlu';
  const formattedIban = iban.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();

  const copyToClipboard = async (text: string, type: 'iban' | 'name') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'iban') {
        setCopiedIban(true);
        setTimeout(() => setCopiedIban(false), 2000);
      } else {
        setCopiedName(true);
        setTimeout(() => setCopiedName(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const selectedPkg = packages.find(p => p.id === selectedPackage);

      // Telefonu normalize et ve doğrula
      const normalizedPhone = toLocalTRPhone(phone);
      if (!/^0\d{10}$/.test(normalizedPhone)) {
        setError("Telefon numarası geçersiz. Lütfen 11 haneli olarak girin. Örn: 05054345555");
        setLoading(false);
        return;
      }

      // Turnstile doğrulaması (client-side gate)
      if (isTurnstileEnabled && !token) {
        setError('Lütfen robot olmadığınızı doğrulayın.');
        setLoading(false);
        return;
      }

      const { error: submitError } = await supabase
        .from('mechanic_signups')
        .insert([
          {
            full_name: fullName,
            shop_name: shopName,
            phone: normalizedPhone,
            package_duration: selectedPkg?.duration,
            package_price: selectedPkg?.price
          }
        ]);

      if (submitError) throw submitError;

      setSubmittedInfo({
        fullName,
        shopName,
        phone: normalizedPhone,
        packageDuration: selectedPkg?.duration,
        packagePrice: selectedPkg?.price
      });
      setSuccess(true);
      setToken(null);
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
    const selectedPkg = packages.find(p => p.id === selectedPackage);
    const whatsappMessage = encodeURIComponent(
      `Merhaba, dekontu iletiyorum.\nAd Soyad: ${submittedInfo?.fullName ?? ''}\nDükkan: ${submittedInfo?.shopName ?? ''}\nTelefon: ${submittedInfo?.phone ?? ''}\nPaket: ${submittedInfo?.packageDuration ?? selectedPkg?.duration ?? ''} - ${submittedInfo?.packagePrice ?? selectedPkg?.price ?? ''} TL`
    );
    const whatsappLink = `https://wa.me/905511721354?text=${whatsappMessage}`;

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

          <div className="bg-orange-50 border-2 border-orange-500 rounded-xl p-6 overflow-hidden">
            <div className="flex items-start gap-4 mb-4">
              <CreditCard size={32} className="text-orange-600 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-xl font-bold text-slate-900 mb-2">Ödeme Bilgileri</h4>
                <p className="text-gray-700">
                  Üyeliğinizin aktif olması için lütfen aşağıdaki hesaba ödeme yapınız:
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border-2 border-orange-300 shadow-sm space-y-4">
                  <div className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 shadow-sm flex flex-wrap items-center gap-3">
                    <div className="flex-1 text-green-800">
                      <p className="font-semibold">Dekontu WhatsApp'tan gönderin</p>
                      <p className="font-bold text-lg">0551 172 13 54</p>
                    </div>
                    <a
                      href={whatsappLink}
                      className="px-3 py-2 rounded-md border border-green-500 bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp
                    </a>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                      IBAN Numarası
                    </label>
                    <div className="w-full max-w-full rounded-2xl border-2 border-orange-300 bg-white shadow-sm overflow-hidden">
                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 px-4 py-3 sm:py-4 w-full max-w-full">
                        <div className="min-w-0 flex-1 overflow-x-auto max-w-full">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                            <span className="font-mono text-base sm:text-2xl font-bold text-slate-900 tracking-wider sm:tracking-widest select-all whitespace-pre">
                              {formattedIban}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(iban, 'iban')}
                          className={`w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-3 sm:px-4 h-10 rounded-lg border text-sm font-semibold transition mt-2 sm:mt-0 ${
                            copiedIban ? 'border-green-300 bg-green-50 text-green-700' : 'border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-700'
                          }`}
                          title="IBAN'ı kopyala"
                          aria-label="IBAN'ı kopyala"
                        >
                          {copiedIban ? <Check size={18} className="text-green-600" /> : <Copy size={18} className="text-orange-600" />}
                          {copiedIban ? 'Kopyalandı' : 'Kopyala'}
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      IBAN gruplandırılarak gösterilir, kopyala düğmesi ham değeri kopyalar.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                      Alıcı Adı
                    </label>
                    <div className="flex items-center justify-between gap-2 bg-slate-50 rounded-lg p-3 border border-slate-200">
                      <span className="text-base sm:text-lg font-semibold text-slate-900">
                        {accountName}
                      </span>
                      <button
                        onClick={() => copyToClipboard(accountName, 'name')}
                        className="flex-shrink-0 p-2 hover:bg-orange-100 rounded-lg transition-colors"
                        title="İsmi kopyala"
                      >
                        {copiedName ? (
                          <Check size={20} className="text-green-600" />
                        ) : (
                          <Copy size={20} className="text-orange-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-orange-200">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                      Ödenecek Tutar
                    </label>
                    <div className="text-2xl sm:text-3xl font-bold text-orange-600">
                      {selectedPkg?.price} TL
                    </div>
                  </div>
                </div>
            

            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle size={24} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-semibold mb-1">ÖNEMLİ UYARI:</p>
                <p className="text-red-700 text-sm leading-relaxed">
                  Ödeme yapılmadan üyelik aktif olmayacaktır. Kayıt olduktan sonra 48 saat içinde ödeme yapılmazsa başvurunuz otomatik olarak silinecektir.
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
                    onChange={(e) => setSelectedPackage(e.target.value as '1' | '3' | '6')}
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
              inputMode="numeric"
              pattern="0[0-9]{10}"
              maxLength={11}
              minLength={11}
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              onBlur={() => {
                const normalized = toLocalTRPhone(phone);
                if (normalized) setPhone(normalized);
              }}
              required
              title="11 haneli, 0 ile başlayan format: 05054345555"
              className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="Örn: 0555 123 45 67"
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Turnstile */}
          <div className="flex justify-center mb-4">
            {isTurnstileEnabled ? (
              <Turnstile
                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                onSuccess={(v) => setToken(v)}
                onExpire={() => setToken(null)}
                onError={() => setToken(null)}
              />
            ) : (
              <p className="text-sm text-green-800 bg-green-50 border border-green-200 rounded px-3 py-2">
                Cloudflare doğrulama local geliştirmede devre dışı. Deploy öncesi yeniden açın.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isTurnstileEnabled ? !token || loading : loading}
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
