-- Insert real suppliers from the uploaded list

DELETE FROM suppliers; -- Önceki örnek verileri temizle

INSERT INTO suppliers (company_name, contact_person, phone, brands) VALUES
('Besa Otomotiv', 'Berat Orman', '0530 817 6118', 'BMW, Mercedes, Land Rover, Mini Cooper, Jaguar'),
('Biz Oto', 'Ümit ve Berke', '0543 180 1919', 'Honda, Hyundai, Kia, Toyota, Nissan'),
('Sancak 1453 Oto', 'Abdul Metin Doğan', '0506 256 7156', 'Oto Elektrik Malzemeleri'),
('Türk Öz Oto', 'Muhammet Türköz', '0531 027 5542', 'Elektrik ve Aksesuar'),
('Öz Metinler Otomotiv', 'Yusuf Bey', '0543 101 5050', 'Yağ Bakım Ürünleri'),
('Oto 24', 'Emincan İşlek', '0537 232 9756', 'BMW, Mercedes, Mini Cooper'),
('YS Otomotiv', 'Selim Boztepe', '0530 780 3779', 'Citroën, Peugeot'),
('HİSAR Oto Yedek Parça', 'Muzaffer Karaman', '0534 013 1690', 'Genel Yedek Parçalar'),
('Anadolu Makina Sanayi', 'İletişim', '0530 498 9024', 'Japon ve Kore Arabaları'),
('Ares Oto Yedek Parça', 'Bünyamin Bey', '0542 627 5340', 'Genel Yedek Parçalar'),
('Mixpart Oto Yedek Parça', 'Ahmet Bayrak', '0530 000 0000', 'Tüm Malzeme Yedek Parçalar'),
('Oto Halil', 'Halil Tiritoğlu', '0507 408 4657', 'Japon-Kore Arabaları'),
('Recep Tanıtmış Oto Asya', 'Recep Tanıtmış', '0536 741 4986', 'Aksesuar Hepsi'),
('MR Leopart Otomotiv', 'İletişim', '0507 437 3233', 'Karışık Kaporta Yedek Parçalar'),
('Şahin Oto Yedek Parça', 'Şahin', '0538 274 9916', 'Japon-Kore Yedek Parçalar'),
('AslanPeugeot', 'Murat Aslan', '0542 296 9658', 'Opel, Peugeot, Citroën, DS'),
('Büyükdağ Otomotiv', 'Fırat Büyükdağ', '0554 499 8168', 'Ford Tüm Parçalar'),
('FSB Otomotiv Yedek Parça', 'İletişim', '0538 474 1755', 'Genel Yedek Parçalar'),
('Merve Otomotiv', 'Yıldray Bayram', '0216 471 1671', 'Ağır Vasıta Tüm Yedek Parçalar'),
('Diriliş Oto Aksesuar', 'Cemal Bey', '0534 208 0228', 'Ses Sistemi Aksesuar'),
('Beyaz Tuning Oto Aksesuar', 'İletişim', '0216 481 9024', 'Oto Aksesuar'),
('Meydan Otomotiv', 'Oğuzhan Meydan', '0542 587 6000', 'Renault, Fiat'),
('Mesut Otomotiv', 'Ahmet Şahbaz', '0533 343 2312', 'Egzoz, Katalizör'),
('Başak Otomotiv', 'Serkan Karabulut', '0530 248 4270', 'Oto Aksesuar'),
('CNL', 'Yusuf Erbek', '0537 302 1282', 'Oto Aksesuar'),
('UNC Aksesuar', 'Murat Can Ayyıldız', '0545 155 4028', 'Krom Parça'),
('Asden Otomotiv', 'Ahmet Bey', '0553 524 9756', 'Renault'),
('Sancak 1453 Oto', 'Abdul Metin Doğan', '0506 256 7156', 'Oto Elektrik Malzemeleri'),
('Biza Otomotiv', 'İletişim', '0530 817 6118', 'BMW, Mercedes, Land Rover, Mini Cooper, Jaguar');

-- Veritabanını kontrol et
SELECT COUNT(*) as total_suppliers FROM suppliers;
