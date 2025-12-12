# Yedek Parçacı Yönetimi Sistemi

## 📋 Uygulamaya Eklenen Yeni Özellikler

### 1. **Yedek Parçacı Listesi Sayfası** (`/suppliers`)
- ✅ Şifre korumalı erişim
- ✅ Arama / Filtreleme (Şirket adı, Marka, Yetkili ismi)
- ✅ Tüm yedek parçacı şirketlerinin listelenmesi
- ✅ Her şirkete tıklayınca detay sayfasına geçiş

### 2. **Yedek Parçacı Detay Sayfası** (`/suppliers/:id`)
- ✅ Şirket bilgileri (Ad, Yetkili, Markalar)
- ✅ Direkt arama butonu (Telefon numarasına tıkla)
- ✅ E-mail adresi (varsa)
- ✅ Geri dönüş butonu

### 3. **Login/Authentication Sistemi**
- ✅ Şifre ile korunan sayfa
- ✅ localStorage kullanarak session yönetimi
- ✅ Çıkış (Logout) fonksiyonu

### 4. **Ana Sayfa Güncellemeleri**
- ✅ "Yedek Parçacıları Gör" butonu eklendi (Hero bileşenine)

---

## 🗄️ Veritabanı Yapısı

### `suppliers` Tablosu

| Sütun | Tip | Açıklama |
|-------|-----|----------|
| `id` | UUID | Benzersiz kimlik |
| `company_name` | TEXT | Şirket adı |
| `contact_person` | TEXT | Yetkili kişinin adı |
| `phone` | TEXT | Telefon numarası |
| `brands` | TEXT | Virgülle ayrılmış marka listesi |
| `email` | TEXT | E-mail adresi (opsiyonel) |
| `address` | TEXT | Adres (opsiyonel) |
| `created_at` | TIMESTAMP | Oluşturma tarihi |
| `updated_at` | TIMESTAMP | Güncelleme tarihi |

---

## 🔧 Kurulum ve Yapılandırma

### 1. **Ortam Değişkenleri Ayarla**

`.env.local` dosyasını oluştur ve aşağıdaki değerleri ekle:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Suppliers Şifresi
VITE_SUPPLIERS_PASSWORD=your_secure_password
```

### 2. **Supabase Migration'ları Çalıştır**

1. `20251212000001_create_suppliers_table.sql` - Suppliers tablosunu oluştur
2. `20251212000002_insert_sample_suppliers.sql` - Örnek veriler ekle

### 3. **Paketleri Yükle**

```bash
npm install react-router-dom
```

---

## 🚀 Kullanım

### Suppliers Sayfasına Erişim

1. **Giriş** (`/suppliers-login`)
   - Şifre gir (environment variable'dan ayarlanan değer)
   - "Giriş Yap" butonuna tıkla

2. **Suppliers Listesi** (`/suppliers`)
   - Tüm yedek parçacıları gör
   - Arama/filtreleme yap
   - Direkt telefon numarasını ara

3. **Detay Sayfası** (`/suppliers/:id`)
   - Şirket detaylarını gör
   - Telefon ve e-mail ile iletişim kur

---

## 📱 Responsive Design

- ✅ Mobil uyumlu
- ✅ Tablet uyumlu
- ✅ Desktop uyumlu

---

## 🛡️ Güvenlik

- Şifre localStorage ile korunur
- Korumalı rotalar authentication kontrol eder
- Supabase RLS politikaları aktifdir

---

## 📝 Bileşenler

### `SupplierLogin.tsx`
- Şifre giriş formu
- Hata mesajları
- Loading durumu

### `SuppliersList.tsx`
- Suppliers listesi
- Arama/Filtreleme
- Kart görünümü
- Direkt arama butonu

### `SupplierDetail.tsx`
- Detay sayfası
- Tüm bilgileri görüntüle
- Telefon ve e-mail linkler

---

## 🔄 Routing Yapısı

```
/ → Ana Sayfa
/suppliers-login → Giriş Sayfası
/suppliers → Suppliers Listesi (Korumalı)
/suppliers/:id → Supplier Detay Sayfası (Korumalı)
```

---

## 📊 Örnek Veriler

Supabase'e 8 adet örnek yedek parçacı şirketi eklenmiştir:
- İstanbul Oto Parçaları
- Ankara Yedek Parçacılık
- İzmir Oto Yedekleri
- Gaziantep Oto Sanayi
- Diyarbakır Parça Merkezi
- Adana Oto Ekspertiz
- Bursa Yedek Parçası
- Konya Oto Parçaları

---

## 🎨 Styling

- **Tailwind CSS** ile tasarlanmış
- Orange (#f97316) ana renk
- Responsive grid sistemi
- Hover efektleri

---

## 📞 İletişim Özellikleri

- **Telefon**: Direkt arama (`tel:` protocol)
- **E-mail**: Direktmail gönderme (`mailto:` protocol)

---

## ⚙️ Teknik Stack

- React 18 + TypeScript
- React Router v6
- Supabase PostgreSQL
- Tailwind CSS
- Lucide Icons
