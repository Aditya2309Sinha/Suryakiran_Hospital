"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, MapPin, Heart, Camera, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Doctors", href: "/#doctors" },
  { name: "Contact", href: "/#contact" },
];



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdown && !(event.target as HTMLElement).closest('.language-dropdown')) {
        setLanguageDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [languageDropdown]);

  const cycleLanguage = () => {
    const langs: Language[] = ['en', 'hi', 'mr'];
    const currentIndex = langs.indexOf(language);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLanguage(langs[nextIndex]);
  };

  const languageLabels: Record<Language, string> = {
  en: "ENGLISH",
  hi: "हिंदी",
  mr: "मराठी"
};

  const getNavName = (key: string): string => {
    const keyMap: Record<string, string> = {
      'Home': 'home',
      'About': 'about',
      'Services': 'services',
      'Doctors': 'doctors',
      'Contact': 'contact'
    };
    return t(keyMap[key] as any);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg shadow-orange-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-trust-brown font-medium hover:text-orange-600 transition-colors duration-300 group"
              >
                {getNavName(link.name)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Contact Button & Language Dropdown & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Language Dropdown - Desktop Only */}
            <div className="hidden lg:block relative language-dropdown">
              <button
                id="language-selector"
                onClick={() => setLanguageDropdown(!languageDropdown)}
                className="p-2 rounded-full hover:bg-orange-50 transition-colors duration-300 flex items-center gap-1"
                title="Change Language"
              >
                <Globe className="w-5 h-5 text-trust-brown" />
                <ChevronDown className={`w-3 h-3 text-trust-brown transition-transform ${languageDropdown ? 'rotate-180' : ''}`} />
              </button>
              {languageDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-orange-100 py-2 z-50"
                >
                  {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setLanguageDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-orange-50 transition-colors ${
                        language === lang ? 'text-orange-600 font-semibold' : 'text-trust-brown'
                      }`}
                    >
                      {languageLabels[lang]}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <Link
              href="/gallery"
              className="p-2 rounded-full hover:bg-orange-50 transition-colors duration-300"
              title="Gallery"
            >
              <Camera className="w-5 h-5 text-trust-brown" />
            </Link>

            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium hover:from-red-500 hover:to-orange-400 transition-all duration-300"
            >
              {t('login')}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors duration-300"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-trust-brown" />
              ) : (
                <Menu className="w-6 h-6 text-trust-brown" />
              )}
            </button>

            {/* Mobile Language Dropdown - Right of Nav Bar */}
            <div className="lg:hidden relative language-dropdown">
              <button
                onClick={() => setLanguageDropdown(!languageDropdown)}
                className="p-2 rounded-full hover:bg-orange-50 transition-colors duration-300 flex items-center gap-1"
                title="Change Language"
              >
                <Globe className="w-5 h-5 text-trust-brown" />
                <ChevronDown className={`w-3 h-3 text-trust-brown transition-transform ${languageDropdown ? 'rotate-180' : ''}`} />
              </button>
              {languageDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-orange-100 py-2 z-50"
                >
                  {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setLanguageDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-orange-50 transition-colors ${
                        language === lang ? 'text-orange-600 font-semibold' : 'text-trust-brown'
                      }`}
                    >
                      {languageLabels[lang]}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <Link
              href="/appointment"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-heal-50 text-heal-600 font-medium hover:bg-heal-100 transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>{t('bookAppointment')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-orange-100"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-trust-brown font-medium hover:bg-orange-50 hover:text-orange-600 transition-all duration-300"
                >
                  {getNavName(link.name)}
                </Link>
              ))}
              <Link
                href="/gallery"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-trust-brown font-medium hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 flex items-center gap-2"
              >
                <Camera className="w-5 h-5" />
                {t('gallery')}
              </Link>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-center bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium"
              >
                {t('login')}
              </Link>
              <div className="pt-4 border-t border-orange-100">
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-orange-50">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-trust-brown">
                    Kandivali East, Mumbai-400101
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}