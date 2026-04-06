"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const galleryImages = [
  { src: "/gallery/Front.jpg", titleKey: "frontView" },
  { src: "/gallery/Entrance.jpg", titleKey: "entrance" },
  { src: "/gallery/Reception.jpg", titleKey: "reception" },
  { src: "/gallery/ICU.jpg", titleKey: "icuLabel" },
  { src: "/gallery/Major-Operation Theatre.jpg", titleKey: "majorOT" },
  { src: "/gallery/Minor-Operation Theatre.jpg", titleKey: "minorOT", rotate: true },
  { src: "/gallery/General Ward.jpg", titleKey: "generalWard", rotate: true },
];

export default function GalleryPage() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-orange-50 text-orange-700 text-sm font-medium mb-4">
              {t('ourFacilities')}
            </span>
            <h1 className="font-montserrat text-4xl sm:text-5xl font-bold text-trust-maroon mb-4">
              {t('galleryTitle')}
            </h1>
            <p className="text-trust-brown/80 max-w-2xl mx-auto text-lg">
              {t('gallerySubtitle')}
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((item, index) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={t(item.titleKey as any)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover group-hover:scale-110 transition-transform duration-500 ${item.rotate ? 'rotate-180' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-montserrat font-semibold text-lg">
                      {t(item.titleKey as any)}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}