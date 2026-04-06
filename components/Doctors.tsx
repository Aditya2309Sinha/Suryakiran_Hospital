"use client";

import { motion } from "framer-motion";
import { Star, Award, Clock, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const doctors = [
  {
    nameKey: "drMahima",
    specialtyKey: "drMahimaSpecialty",
    degree: "M.S. (Gen. Surgery)",
    descriptionKey: "drMahimaDesc",
    timingKey: "drMahimaTiming",
    image: null,
  },
  {
    nameKey: "drAbhishiek",
    specialtyKey: "drAbhishiekSpecialty",
    degree: "M.S., DNB (Ortho)",
    descriptionKey: "drAbhishiekDesc",
    timingKey: "drAbhishiekTiming",
    noteKey: "drAbhishiekNote",
    image: "/images/ABHISHEIK.jpg",
  },
  {
    nameKey: "drNilesh",
    specialtyKey: "drNileshSpecialty",
    degree: "M.B.B.S., DNB (Med), AFIH, IDCCM",
    descriptionKey: "drNileshDesc",
    timingKey: "drNileshTiming",
    image: null,
  },
  {
    nameKey: "drSangita",
    specialtyKey: "drSangitaSpecialty",
    degree: "M.B.B.S., DGO",
    descriptionKey: "drSangitaDesc",
    timingKey: "drSangitaTiming",
    image: null,
  },
  {
    nameKey: "drSushila",
    specialtyKey: "drSushilaSpecialty",
    degree: "M.D., D.G.O.",
    descriptionKey: "drSushilaDesc",
    timingKey: "drSushilaTiming",
    image: null,
  },
  {
    nameKey: "drHemal",
    specialtyKey: "drHemalSpecialty",
    degree: "D.C.H., D.N.B.",
    descriptionKey: "drHemalDesc",
    timingKey: "drHemalTiming",
    image: null,
  },
  {
    nameKey: "drNikunj",
    specialtyKey: "drNikunjSpecialty",
    degree: "M.B.B.S., M.D. (Med)",
    descriptionKey: "drNikunjDesc",
    timingKey: "drNikunjTiming",
    image: null,
  },
];

export default function Doctors() {
  const { t } = useLanguage();
  return (
    <section id="doctors" className="section-padding bg-orange-50/30">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-heal-50 text-heal-700 text-sm font-medium mb-4">
            {t('doctors')}
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-bold text-trust-maroon mb-4">
            {t('doctorsTitle')}
          </h2>
          <p className="text-trust-brown/80 max-w-2xl mx-auto">
            {t('doctorsSubtitle')}
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.nameKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card-hover group"
            >
              {/* Image with warm gradient */}
              <div className="relative aspect-square rounded-t-2xl bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
                {doctor.image ? (
                  <Image
                    src={doctor.image}
                    alt={t(doctor.nameKey as any)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
                      <span className="text-4xl font-bold text-white">
                        {t(doctor.nameKey as any).split(" ").pop()?.charAt(0)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-montserrat font-semibold text-lg text-trust-maroon mb-1">
                  {t(doctor.nameKey as any)}
                </h3>
                <p className="text-orange-600 font-medium text-sm mb-3">
                  {t(doctor.specialtyKey as any)}
                </p>
                <p className="text-trust-brown/70 text-sm leading-relaxed">
                  {t(doctor.descriptionKey as any)}
                </p>
              </div>
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
          <Link href="/doctors" className="btn-secondary inline-flex items-center gap-2">
            <Award className="w-5 h-5" />
            {t('viewAllDoctors')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}