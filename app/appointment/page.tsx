"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const doctors = [
  { nameKey: "drMahima", specialtyKey: "drMahimaSpecialty", timingKey: "drMahimaTiming" },
  { nameKey: "drNilesh", specialtyKey: "drNileshSpecialty", timingKey: "drNileshTiming" },
  { nameKey: "drSangita", specialtyKey: "drSangitaSpecialty", timingKey: "drSangitaTiming" },
  { nameKey: "drHemal", specialtyKey: "drHemalSpecialty", timingKey: "drHemalTiming" },
  { nameKey: "drAbhishiek", specialtyKey: "drAbhishiekSpecialty", timingKey: "drAbhishiekTiming" },
  { nameKey: "drSushila", specialtyKey: "drSushilaSpecialty", timingKey: "drSushilaTiming" },
  { nameKey: "drNikunj", specialtyKey: "drNikunjSpecialty", timingKey: "drNikunjTiming" },
];

export default function AppointmentPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    doctor: '',
    date: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || 'Failed to submit appointment. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-xl p-12 text-center"
            >
              <div className="text-6xl mb-6">✅</div>
              <h2 className="font-montserrat text-3xl font-bold text-trust-maroon mb-4">
                {t('appointmentSuccess')}
              </h2>
              <p className="text-trust-brown text-lg mb-6">
                {t('thankYou')}
              </p>
              <p className="text-trust-brown/70">
                {t('emergencyNote')} <strong>+91 22 4963 4780</strong>
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    doctor: '',
                    date: '',
                    message: '',
                  });
                }}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:from-orange-400 hover:to-red-500 transition-all"
              >
                {t('bookAnother')}
              </button>
            </motion.div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-8 text-white">
              <h1 className="font-montserrat text-3xl font-bold mb-2">{t('bookYourAppointment')}</h1>
              <p className="opacity-90">{t('fillDetails')}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8">
              {/* Contact Info Banner */}
              <div className="flex flex-wrap gap-4 mb-8 p-4 bg-orange-50 rounded-xl">
                <div className="flex items-center gap-2 text-trust-brown">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+91 22 4963 4780</span>
                </div>
                <div className="flex items-center gap-2 text-trust-brown">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Mon-Sat: 9AM - 8PM</span>
                </div>
              </div>

              {/* Row 1: Name */}
              <div className="form-row">
                <div className="form-group">
                  <label>{t('firstName')} *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Rahul"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t('lastName')} *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Sharma"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Contact */}
              <div className="form-row">
                <div className="form-group">
                  <label>{t('phoneNumber')} *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t('emailAddress')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              {/* Row 3: Doctor & Date */}
              <div className="form-row">
                <div className="form-group">
                  <label>{t('selectDoctor')} *</label>
                  <select
                    name="doctor"
                    value={formData.doctor || ''}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t('selectDoctor')}</option>
                    {doctors.map((doc) => (
                      <option key={doc.nameKey} value={t(doc.nameKey as any)}>
                        {t(doc.nameKey as any)} - {t(doc.specialtyKey as any)} ({t(doc.timingKey as any)})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('preferredDate')} *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label>{t('messageSymptoms')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Briefly describe your symptoms or reason for visit..."
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="form-submit"
              >
                {isSubmitting ? t('submitting') : '📅 ' + t('confirmAppointment') + ' →'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}