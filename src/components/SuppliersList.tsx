import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Phone, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export type Supplier = {
  id: string;
  company_name: string;
  contact_person: string;
  phone: string;
  brands: string;
  email?: string;
  address?: string;
  created_at: string;
};

export function SuppliersList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('suppliers')
        .select('*')
        .order('company_name', { ascending: true });

      if (fetchError) throw fetchError;
      setSuppliers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Veri yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('supplierAuth');
    navigate('/');
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.brands.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact_person.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Yedek Parçacı Şirketleri</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Çıkış
            </button>
          </div>

          <div className="mt-6">
            <input
              type="text"
              placeholder="Şirket, marka veya yetkili adına göre ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {filteredSuppliers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {searchTerm ? 'Arama kriterlerine uygun yedek parçacı bulunamadı.' : 'Henüz yedek parçacı eklenmemiştir.'}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                onClick={() => navigate(`/suppliers/${supplier.id}`)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer overflow-hidden border border-gray-200"
              >
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                  <h2 className="text-2xl font-bold break-words">
                    {supplier.company_name}
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                      Yetkili
                    </p>
                    <p className="text-lg font-semibold text-slate-900">
                      {supplier.contact_person}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                      Markalar
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {supplier.brands.split(',').map((brand, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {brand.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `tel:${supplier.phone}`;
                    }}
                    className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone size={18} />
                    {supplier.phone}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12 text-gray-600">
          <p>Toplam {filteredSuppliers.length} yedek parçacı bulunmaktadır.</p>
        </div>
      </div>
    </div>
  );
}
