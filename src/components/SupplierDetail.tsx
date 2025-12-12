import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2, ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import { Supplier } from './SuppliersList';

export function SupplierDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSupplier = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('suppliers')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      setSupplier(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Veri yüklenemedi');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSupplier();
  }, [fetchSupplier]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !supplier) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-6">{error || 'Yedek parçacı bulunamadı'}</p>
          <button
            onClick={() => navigate('/suppliers')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/suppliers')}
            className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Geri Dön
          </button>
          <h1 className="text-4xl font-bold">{supplier.company_name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Main Info Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">{supplier.company_name}</h2>
            <p className="text-orange-100">Yedek Parçacı Şirketi</p>
          </div>

          {/* Details */}
          <div className="p-8 space-y-8">
            {/* Yetkili */}
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-2">
                Yetkili Kişi
              </h3>
              <p className="text-2xl font-bold text-slate-900">{supplier.contact_person}</p>
            </div>

            {/* Telefon */}
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4">
                Telefon Numarası
              </h3>
              <a
                href={`tel:${supplier.phone}`}
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
              >
                <Phone size={24} />
                {supplier.phone}
              </a>
            </div>

            {/* Email */}
            {supplier.email && (
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4">
                  E-mail
                </h3>
                <a
                  href={`mailto:${supplier.email}`}
                  className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                >
                  <Mail size={24} />
                  {supplier.email}
                </a>
              </div>
            )}

            {/* Address */}
            {supplier.address && (
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4">
                  Adres
                </h3>
                <div className="flex items-start gap-3 text-slate-700">
                  <MapPin size={24} className="text-purple-500 flex-shrink-0 mt-1" />
                  <p className="text-lg">{supplier.address}</p>
                </div>
              </div>
            )}

            {/* Brands */}
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4">
                Sattığı Markalar
              </h3>
              <div className="flex flex-wrap gap-3">
                {supplier.brands.split(',').map((brand, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md"
                  >
                    {brand.trim()}
                  </div>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-100 p-6 rounded-lg border border-gray-300 mt-8">
              <p className="text-sm text-gray-600">
                <strong>Not:</strong> Bu sayfadaki telefon numarasını tıklayarak doğrudan arayabilir veya e-mail adresine başvurabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
