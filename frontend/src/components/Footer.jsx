import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from './ui/Modal';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/logo.jpg"
                alt="OrganDonor Logo"
                className="w-12 h-12 object-cover rounded-full cursor-zoom-in hover:scale-110 transition-transform bg-white"
                onClick={() => setIsLogoModalOpen(true)}
              />
              <span className="text-xl font-bold text-white">OrganDonor</span>
            </div>
            <p className="text-sm text-gray-400">
              {t('footer.tagline', 'Saving lives through organ donation. Join us in making a difference.')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.quickLinks', 'Quick Links')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">
                  {t('footer.home', 'Home')}
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-primary-400 transition-colors">
                  {t('nav.register', 'Register')}
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-primary-400 transition-colors">
                  {t('nav.login', 'Login')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.resources', 'Resources')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {t('footer.about', 'About Organ Donation')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {t('footer.faqs', 'FAQs')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {t('footer.privacy', 'Privacy Policy')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.contact', 'Contact Us')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>kishormagesh2611@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>+91-7418551673
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>INDIA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Organ Donor System. All rights reserved.</p>
          <p className="mt-2 text-gray-500">Built with ❤️ by <span className="text-primary-400 font-semibold">kishor M</span></p>
        </div>
      </div>

      {/* Logo Preview Modal - WhatsApp Style */}
      <Modal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        size="none"
        className="!bg-transparent p-0 border-none shadow-none"
      >
        <div className="relative flex flex-col items-center justify-end h-screen w-screen pb-12 md:pb-24" onClick={() => setIsLogoModalOpen(false)}>
          <img
            src="/logo.jpg"
            alt="Full Logo View"
            className="max-w-[90vw] max-h-[85vh] object-contain shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;
