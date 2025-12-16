import { Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-6">İletişim</h3>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
          <a
            href="tel:+905511721354"
            className="flex items-center gap-2 text-lg hover:text-orange-400 transition-colors"
          >
            <Phone size={24} />
            <span>0551 172 13 54</span>
          </a>

          <a
            href="mailto:info@sanayimden.com"
            className="flex items-center gap-2 text-lg hover:text-orange-400 transition-colors"
          >
            <Mail size={24} />
            <span>info@sanayimden.com</span>
          </a>
        </div>

        <div className="border-t border-slate-700 pt-6">
          <p className="text-gray-400 text-lg">
            <span className="font-bold text-white">Sanayimden</span> – Türkiye'nin oto sanayi platformu
          </p>
        </div>
      </div>
    </footer>
  );
}
