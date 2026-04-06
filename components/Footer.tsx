"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const quickLinks = [
  { nameKey: "home", href: "/" },
  { nameKey: "about", href: "/about" },
  { nameKey: "services", href: "/services" },
  { nameKey: "doctors", href: "/doctors" },
  { nameKey: "contact", href: "/contact" },
];

const services = [
  { nameKey: "general" },
  { nameKey: "pediatrics" },
  { nameKey: "surgical" },
  { nameKey: "icuService" },
  { nameKey: "childrenWard" },
  { nameKey: "emergencyServices" },
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-trust-maroon text-white/80" id="contact">
      <div className="relative">
        {/* Decorative gradient - warm with green */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-heal-900/20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Hospital Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative w-40 h-16">
                  <Image
                    src="/images/BHPL.jpg"
                    alt="Billore Hospital Private Limited"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="font-montserrat font-bold text-xl text-white">
                {t('socialInitiative')}
              </p>
              <p className="text-white/70 leading-relaxed">
                {t('footerAboutDesc')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-montserrat font-semibold text-lg text-white mb-6">
                {t('quickLinks')}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.nameKey}>
                    <Link 
                      href={link.href}
                      className="hover:text-heal-400 transition-colors duration-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-heal-500" />
                      {t(link.nameKey as any)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-montserrat font-semibold text-lg text-white mb-6">
                {t('footerServices')}
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.nameKey}>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {t(service.nameKey as any)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-montserrat font-semibold text-lg text-white mb-6">
                {t('contactUs')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-heal-500 mt-0.5" />
                  <a 
                    href="https://maps.app.goo.gl/LoS2dkxX8NAzkaXj7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 text-sm hover:text-heal-400 transition-colors"
                  >
                    1st Floor, Near Kranti Nagar Auto Stand,<br />
                    Akruli Road, Kandivali East,<br />
                    Mumbai-400101, Maharashtra
                  </a>
                </div>
                <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!3m2!1sen!2sin!4v1775023825808!5m2!1sen!2sin!6m8!1m7!1s96VnnoQ4atENUJv_sTPp3w!2m2!1d19.19499125650766!2d72.87238743249469!3f86.02687265104859!4f10.877778020737225!5f1.1924812503605782"
                    width="100%"
                    height="180"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-heal-500" />
                  <div className="flex flex-col">
                    <a href="tel:+912249634780" className="hover:text-heal-400 transition-colors">+91 22 4963 4780</a>
                    <a href="tel:+918433534780" className="hover:text-heal-400 transition-colors">+91 8433 534780</a>
                    <a href="tel:+918879634780" className="hover:text-heal-400 transition-colors">+91 8879 634780</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="text-white/70 text-sm">{t('open247')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/50 text-sm">
                {t('copyright')}
              </p>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <span>{t('madeWith').split(' ')[0]}</span>
                <Heart className="w-4 h-4 text-red-500 fill-current animate-heartbeat" />
                <span>{t('madeWith').split(' ').slice(1).join(' ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}