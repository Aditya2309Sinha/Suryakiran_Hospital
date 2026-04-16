"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  HeartPulse, Baby, Activity, Stethoscope, 
  FlaskConical, Scan, Wind, Mic, 
  Shield, Bone, Eye, AlertCircle
} from "lucide-react";

export default function Services() {
  const { t } = useLanguage();
  
  const services: { icon: React.ComponentType<{ className?: string }>; titleKey: string; descKey: string; color: string }[] = [
    { icon: AlertCircle, titleKey: "ICU/ICCU", descKey: "ICU/ICCU-desc", color: "from-red-500 to-orange-500" },
    { icon: Shield, titleKey: "Surgical", descKey: "Surgical-desc", color: "from-orange-500 to-red-500" },
    { icon: Stethoscope, titleKey: "General Medicine", descKey: "General Medicine-desc", color: "from-orange-400 to-amber-500" },
    { icon: Baby, titleKey: "Gynaecology/Maternity", descKey: "Gynaecology/Maternity-desc", color: "from-pink-500 to-rose-500" },
    { icon: AlertCircle, titleKey: "Accident & Trauma", descKey: "Accident & Trauma-desc", color: "from-red-400 to-orange-400" },
    { icon: Activity, titleKey: "Urology", descKey: "Urology-desc", color: "from-teal-500 to-cyan-500" },
    { icon: Scan, titleKey: "Endoscopy / Laparoscopy", descKey: "Endoscopy / Laparoscopy-desc", color: "from-purple-500 to-indigo-500" },
    { icon: HeartPulse, titleKey: "Cancer", descKey: "Cancer-desc", color: "from-rose-500 to-red-500" },
    { icon: Baby, titleKey: "Pediatrics", descKey: "Pediatrics-desc", color: "from-pink-400 to-rose-400" },
    { icon: Eye, titleKey: "Skin", descKey: "Skin-desc", color: "from-amber-400 to-yellow-500" },
    { icon: Mic, titleKey: "ENT", descKey: "ENT-desc", color: "from-cyan-500 to-teal-500" },
    { icon: Wind, titleKey: "Chest TB", descKey: "Chest TB-desc", color: "from-slate-500 to-gray-500" },
  ];
  return (
    <section id="services" className="section-padding bg-orange-50/50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-orange-50 text-orange-700 text-sm font-medium mb-4">
            {t('services')}
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-bold text-trust-maroon mb-4">
            {t('servicesTitle')}
          </h2>
          <p className="text-trust-brown/80 max-w-2xl mx-auto">
            {t('servicesSubtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-orange-500/10 border border-orange-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-montserrat font-semibold text-xl text-trust-maroon mb-2">
                {t(service.titleKey)}
              </h3>
              <p className="text-sm text-trust-brown/70 leading-relaxed">
                {t(service.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/appointment" className="btn-primary inline-flex items-center gap-2">
            {t('bookNow')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}