# Suryakiran Multispecialty Hospital Website

A modern healthcare website built with Next.js, React, Tailwind CSS, and Framer Motion.

## Overview

Suryakiran Multispecialty Hospital is a NABH-accredited, trusted private, multispeciality, and children's hospital located in Kandivali East, Mumbai. This website showcases the hospital's services, medical team, facilities, and provides online appointment booking with multilingual support.

## Features

- **Multilingual Support**: English, Hindi (हिं), Marathi (मर) with dropdown selector
- **NABH Accredited**: Quality healthcare certification
- **Online Appointment Booking**: Form submission triggers n8n workflow
- **Admin Dashboard**: Protected login for staff to manage appointments
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Framer Motion for fluid transitions
- **Services Section**: 16 comprehensive healthcare services
- **Doctors Profile**: 7 specialists with OPD timing
- **Gallery**: Hospital facility images
- **24/7 Emergency Services**

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11.3
- **Icons**: Lucide React
- **Auth**: JWT with cookies
- **Integration**: n8n workflow triggers

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# Optional: Add any environment variables if needed
JWT_SECRET=your-secret-key
```

## Project Structure

```
hospital/
├── app/
│   ├── api/                  # API routes
│   │   ├── book-appointment/ # Appointment booking
│   │   ├── login/            # Authentication
│   │   ├── logout/           # Logout
│   │   ├── templates/        # Email templates
│   │   ├── trigger-workflow/ # n8n trigger
│   │   └── verify/           # Token verification
│   ├── appointment/          # Booking page
│   ├── contact/              # Contact page
│   ├── dashboard/            # Admin dashboard (protected)
│   ├── doctors/              # Doctors list page
│   ├── gallery/              # Photo gallery
│   ├── login/                # Admin login
│   ├── services/             # Services page
│   ├── about/                # About page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── Navbar.tsx            # Navigation with language dropdown
│   ├── Hero.tsx              # Hero section
│   ├── About.tsx             # About section
│   ├── Services.tsx          # Services grid
│   ├── Doctors.tsx           # Doctors cards
│   ├── Counter.tsx           # Animated counter
│   └── Footer.tsx            # Footer with contact info
├── context/
│   └── LanguageContext.tsx   # i18n context
├── lib/
│   ├── translations.ts       # All translations (en/hi/mr)
│   ├── auth.ts              # Auth utilities
│   └── login-logger.ts      # Login activity logging
├── public/
│   ├── images/               # Hospital images, logos
│   └── gallery/              # Facility photos
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```

## Hospital Information

**Name**: Suryakiran Multispecialty Hospital  
**Parent Company**: Billore Hospital Private Limited  
**Address**: 1st Floor, Near Kranti Nagar Auto Stand, Akruli Road, Kandivali East, Mumbai-400101, Maharashtra  
**Experience**: 13+ Years in Healthcare  
** **: 4.2 stars (150+ reviews)  
**Accreditation**: NABH  

### Contact Numbers

- +91 22 4963 4780
- +91 8433 534780
- +91 8879 634780

## Services

1. ICU (Intensive Care Unit)
2. ICCU (Cardiac Care Unit)
3. Surgical
4. General Medicine
5. Gynaecology
6. Maternity
7. Accident & Trauma
8. Urology
9. Laparoscopy
10. Endoscopy
11. Cancer Care
12. Pediatrics
13. Skin Care
14. ENT
15. Chest & TB

## Medical Team

1. **Dr. Mahima (Mishra) Billore** - General Surgeon (GI, Breast & Laparoscopic) - 12:00 PM - 2:00 PM
2. **Dr. Abhishiek S. Jaipuria** - Orthopaedician - 2:00 PM - 4:00 PM (No OPD Thursday & Sunday)
3. **Dr. Nilesh Ghorpade** - Physician & Cardiologist - 8:30 PM - 10:30 PM
4. **Dr. Sangita Chatterjee** - Obstetrician & Gynaecologist - 10:30 AM - 11:30 AM
5. **Dr. Sushila Bawa** - Obstetrician & Gynaecologist - 4:00 PM - 5:00 PM
6. **Dr. Hemal Mistry** - Child Specialist - 6:00 PM - 7:00 PM
7. **Dr. Nikunj Bavishi** - Physician - 6:00 PM - 8:00 PM

## API Integration

The appointment form triggers an n8n workflow for:
- Email notifications to hospital staff
- SMS/WhatsApp confirmation to patients
- Calendar scheduling

## Color Palette

- **Primary**: Maroon (#991b1b) / Brown (#78350f)
- **Accent**: Orange (#f97316) / Red (#dc2626)
- **Heal**: Teal (#0d9488)
- **Background**: White / Orange-50

## Design Features

- Glassmorphism cards with backdrop blur
- Gradient backgrounds with orange/red theme
- Smooth hover animations
- Responsive grid layouts
- Animated counters
- Mobile-friendly navigation with hamburger menu

## License

This project is for demonstration purposes.

## Contact

For any queries, contact the hospital directly at the address provided above.