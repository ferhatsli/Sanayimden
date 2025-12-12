import { useState } from 'react';
import { Lock } from 'lucide-react';

type SupplierLoginProps = {
  onLoginSuccess: () => void;
};

export function SupplierLogin({ onLoginSuccess }: SupplierLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Şifre ortam değişkeninden okunur (güvenlik için)
  const ADMIN_PASSWORD = import.meta.env.VITE_SUPPLIERS_PASSWORD || 'admin123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basit şifre kontrolü
    if (password === ADMIN_PASSWORD) {
      // localStorage'a giriş bilgisini kaydet
      localStorage.setItem('supplierAuth', 'true');
      onLoginSuccess();
    } else {
      setError('Şifre yanlış. Lütfen tekrar deneyin.');
    }
    
    setLoading(false);
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <div className="bg-orange-500 p-4 rounded-full">
            <Lock size={48} className="text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 text-slate-900">
          Yedek Parçacı Girişi
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Şifrenizi girerek yedek parçacı listesine erişin
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105"
          >
            {loading ? 'Kontrol Ediliyor...' : 'Giriş Yap'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-6">
          Bu alan sadece yetkili kullanıcılar için korunmaktadır.
        </p>
      </div>
    </div>
  );
}
