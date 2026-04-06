"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Heart, MapPinned } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50/30" />
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-orange-50 text-orange-700 text-sm font-medium mb-4">
              {t('getInTouch')}
            </span>
            <h1 className="font-montserrat text-4xl sm:text-5xl font-bold text-trust-maroon mb-4">
              {t('contactTitle')}
            </h1>
            <p className="text-trust-brown/80 max-w-2xl mx-auto text-lg">
              {t('contactSubtitle')}
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-orange-500/10 border border-orange-100"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-montserrat font-semibold text-trust-maroon mb-2">Address</h3>
              <a 
                href="https://maps.app.goo.gl/LoS2dkxX8NAzkaXj7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-trust-brown/70 text-sm hover:text-orange-600 transition-colors"
              >
                1st Floor, Near Kranti Nagar Auto Stand,<br />
                Akruli Road, Kandivali East,<br />
                Mumbai-400101, Maharashtra
              </a>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-orange-500/10 border border-orange-100"
            >
              <div className="w-12 h-12 rounded-xl bg-heal-100 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-heal-600" />
              </div>
              <h3 className="font-montserrat font-semibold text-trust-maroon mb-2">{t('phoneLabel')}</h3>
              <p className="text-trust-brown/70 text-sm">
                <a href="tel:+912249634780" className="hover:text-orange-600 transition-colors">
                  +91 22 4963 4780
                </a>
              </p>
              <p className="text-trust-brown/70 text-sm mt-1">
                <a href="tel:+918433534780" className="hover:text-orange-600 transition-colors">
                  +91 8433 534780
                </a>
              </p>
              <p className="text-trust-brown/70 text-sm mt-1">
                <a href="tel:+918879634780" className="hover:text-orange-600 transition-colors">
                  +91 8879 634780
                </a>
              </p>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-orange-500/10 border border-orange-100"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-montserrat font-semibold text-trust-maroon mb-2">{t('emailLabel')}</h3>
              <p className="text-trust-brown/70 text-sm">
                <a href="mailto:info@suryakiranhospital.com" className="hover:text-orange-600 transition-colors">
                  info@suryakiranhospital.com
                </a>
              </p>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-orange-500/10 border border-orange-100"
            >
              <div className="w-12 h-12 rounded-xl bg-heal-100 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-heal-600" />
              </div>
              <h3 className="font-montserrat font-semibold text-trust-maroon mb-2">{t('hours')}</h3>
              <p className="text-trust-brown/70 text-sm">
                {t('open247')}<br />
                Emergency Services
              </p>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-orange-500/10 border border-orange-100"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!3m2!1sen!2sin!4v1775023825808!5m2!1sen!2sin!6m8!1m7!1s96VnnoQ4atENUJv_sTPp3w!2m2!1d19.19499125650766!2d72.87238743249469!3f86.02687265104859!4f10.877778020737225!5f1.1924812503605782"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Suryakiran Hospital Location"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}