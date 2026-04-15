"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Heart, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Counter from "./Counter";
import { useLanguage } from "@/context/LanguageContext";

const features = [
  { icon: Shield, titleKey: "yearsTrust", descKey: "heroDesc1" },
  { icon: Heart, titleKey: "expertCare", descKey: "heroDesc2" },
  { icon: Clock, titleKey: "availability", descKey: "heroDesc3" },
];

export default function Hero() {
  const { t } = useLanguage();
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50/30" />

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-400/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-heal-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-heal-400/10 rounded-full blur-3xl" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        
        {/* MAIN GRID (fixed alignment) */}
        <div className="grid lg:grid-cols-2 gap-12 items-center justify-items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Badge with Heart Accent */}
            <div className="flex flex-col items-center gap-4 w-full">
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
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="font-montserrat text-xs sm:text-sm lg:text-base font-bold leading-tight">
                <span className="text-trust-maroon">{t('heroTitle')}</span>
                <br />
                <span className="gradient-text">{t('heroSubtitle')}</span>
              </h1>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Link href="/appointment" className="btn-primary flex items-center gap-2">
                {t("bookAppointment")}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#services"
                className="px-6 py-3 bg-white border-2 border-orange-200 rounded-xl hover:border-orange-500"
              >
                {t("heroServices")}
              </Link>
            </div>
          </motion.div>

          {/* RIGHT IMAGE (CENTERED FIX) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex justify-center"
          >
            <div className="relative w-full max-w-md bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">

              {/* Image */}
              <div className="aspect-[4/3] relative">
                {images.map((src, index) => (
                  <motion.div
                    key={index}
                    animate={{ opacity: index === currentImage ? 1 : 0 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={src}
                      alt="Hospital"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 text-center border-t">
                <div className="p-4">
                  <Counter endValue={13} suffix="+" />
                  <p className="text-xs">{t("years")}</p>
                </div>
                <div className="p-4">
                  <Counter endValue={10} suffix="+" />
                  <p className="text-xs">{t("doctorsLabel")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FEATURES */}
        <div className="flex justify-center mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
            {features.map((feature, index) => (
              <div key={index} className="p-6 text-center shadow rounded-xl bg-white">
                <feature.icon className="mx-auto mb-3 text-orange-500" />
                <h3 className="font-semibold">{t(feature.titleKey)}</h3>
                <p className="text-sm text-gray-500">{t(feature.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
