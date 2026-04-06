"use client";

import { motion } from "framer-motion";
import { Award, Users, Clock, HeartHandshake, Heart } from "lucide-react";
import Image from "next/image";
import Counter from "./Counter";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-orange-50 text-orange-700 text-sm font-medium mb-4">
                {t('about')}
              </span>
              <h2 className="font-montserrat text-3xl sm:text-4xl font-bold text-trust-maroon mb-4">
                {t('aboutTitle')}
              </h2>
              <p className="text-trust-brown/80 leading-relaxed text-lg">
                {t('aboutDesc1')}
              </p>
              <p className="text-trust-brown/80 leading-relaxed mt-4">
                {t('aboutDesc2')}
              </p>
            </div>

            {/* Key highlights with Green Accents */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                t('cleanEnvironment'),
                t('childrenWard'),
                t('emergencyServices'),
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-heal-500" />
                  <span className="text-trust-brown font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Stats with new colors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {[
                { value: 13, suffix: "+", icon: Clock, labelKey: "yearsExperience" },
                { value: 50, suffix: "K+", icon: Users, labelKey: "patientsServed" },
                { value: 5, suffix: "+", icon: Award, labelKey: "expertDoctorsLabel" },
                { value: 4.2, suffix: "", decimals: 1, icon: HeartHandshake, labelKey: "starRating" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center p-4 rounded-2xl bg-orange-50"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                  <Counter
                    endValue={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    color="text-trust-maroon"
                    className="text-2xl font-bold"
                  />
                  <p className="text-xs text-trust-brown/60">{t(stat.labelKey)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-100">
              {/* NABH Image */}
              <div className="aspect-square rounded-2xl overflow-hidden border border-orange-100 shadow-lg">
                <Image
                  src="/images/NABH.jpg"
                  alt="NABH Accreditation"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* Decorative elements - Green + Orange */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-heal-400 to-heal-500 rounded-full opacity-20 blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-20 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}