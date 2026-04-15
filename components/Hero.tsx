"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Heart, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Counter from "./Counter";
import { useLanguage } from "@/context/LanguageContext";

const features = [
  {
    icon: Shield,
    titleKey: "yearsTrust",
    descKey: "heroDesc1",
  },
  {
    icon: Heart,
    titleKey: "expertCare",
    descKey: "heroDesc2",
  },
  {
    icon: Clock,
    titleKey: "availability",
    descKey: "heroDesc3",
  },
  {
    icon: Star,
    titleKey: "rating",
    descKey: "heroDesc4",
  },
];

export default function Hero() {
  const { t, language } = useLanguage();
  const images = ["/images/logo.png", "/images/logo.png"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements - Warm gradient with subtle green accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50/30" />
      
      {/* Animated gradient orbs - Orange/Red + Green */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-heal-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-heal-400/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-orange-500/10 to-transparent rounded-full" />

      {/* Grid pattern overlay - using warm color */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge with Heart Accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-4 w-full"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600 text-center block">
                {t('heroNewLine1')}
                <br />
                {t('heroNewLine2')}
              </span>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-sm font-medium text-orange-700">{t('heroTitle')}</span>
                <Heart className="w-3 h-3 text-red-500 fill-current ml-1" />
              </div>
            </motion.div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="font-montserrat text-xs sm:text-sm lg:text-base font-bold leading-tight">
                <span className="text-trust-maroon">{t('heroTitle')}</span>
                <br />
                <span className="gradient-text">{t('heroSubtitle')}</span>
              </h1>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/appointment" className="btn-primary flex items-center gap-2">
                {t('bookAppointment')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#services" className="px-6 py-3 bg-white text-trust-brown font-semibold rounded-xl border-2 border-orange-200 hover:border-orange-500 hover:text-orange-600 transition-all duration-300">
                {t('heroServices')}
              </Link>
            </div>
          </motion.div>

          {/* Hero Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Glassmorphism card with warm gradient */}
            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl shadow-orange-500/10 overflow-hidden">
              {/* Image carousel with fade animation */}
              <div className="aspect-[4/3] relative bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
                {images.map((src, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === currentImage ? 1 : 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={src}
                      alt="Suryakiran Hospital"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                ))}
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
                >
                  <span className="text-orange-600 font-semibold text-sm">24/7 Emergency</span>
                </motion.div>
                
                  
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-orange-100 border-t border-orange-100">
                <div className="p-4 text-center">
                  <Counter endValue={13} suffix="+" color="text-orange-600" className="text-2xl font-bold" />
                  <p className="text-xs text-trust-brown/60">{t('years')}</p>
                </div>
                <div className="p-4 text-center">
                  <Counter endValue={5} suffix="+" color="text-orange-600" className="text-2xl font-bold" />
                  <p className="text-xs text-trust-brown/60">{t('doctorsLabel')}</p>
                </div>
                <div className="p-4 text-center">
                  <Counter endValue={150} suffix="+" color="text-orange-600" className="text-2xl font-bold" />
                  <p className="text-xs text-trust-brown/60">{t('reviews')}</p>
                </div>
              </div>
            </div>

            {/* Decorative elements - Green accents */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-heal-400 to-heal-500 rounded-2xl opacity-20 blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl opacity-20 blur-xl" />
          </motion.div>
        </div>

        {/* Features Grid with Green Accents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {features.map((feature, index) => (
            <div
              key={feature.titleKey}
              className="glass-card-hover p-6 text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-trust-maroon mb-1">{t(feature.titleKey)}</h3>
              <p className="text-sm text-trust-brown/60">{t(feature.descKey)}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}