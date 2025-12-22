# 🦷 DentWise - AI Dental Assistant

<div align="center">
  <img src="/public/logo.png" alt="DentWise Logo" width="120" height="120">
  
  <p align="center">
    Your intelligent dental health companion powered by AI
    <br />
    <a href="#features"><strong>Explore Features »</strong></a>
    <br />
    <br />
    <a href="#demo">View Demo</a>
    ·
    <a href="#installation">Installation</a>
    ·
    <a href="#usage">Usage</a>
  </p>
</div>

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About

DentWise is a modern, AI-powered dental assistant platform that combines voice AI technology with appointment management to provide users with instant dental advice and seamless booking experiences. The platform features real-time voice consultations, smart appointment scheduling, and comprehensive practice management tools.

## ✨ Features

### For Patients
- 🎤 **AI Voice Assistant** - Real-time voice conversations with AI dental assistant using Vapi
- 📅 **Smart Appointment Booking** - Intuitive booking system with availability checking
- 📧 **Email Confirmations** - Automated appointment confirmations via Resend
- 📊 **Personal Dashboard** - Track appointments and dental health metrics
- 🔔 **Appointment Management** - View upcoming and past appointments

### For Administrators
- 👨‍⚕️ **Doctor Management** - Add, edit, and manage dentist profiles
- 📈 **Analytics Dashboard** - View practice statistics and metrics
- 📋 **Appointment Overview** - Comprehensive view of all appointments
- 🔧 **Practice Configuration** - Manage availability and settings

### Technical Features
- 🔐 **Secure Authentication** - Powered by Clerk
- 💳 **Subscription Management** - Integrated pricing tiers with Clerk
- 🎨 **Modern UI/UX** - Built with Tailwind CSS and shadcn/ui
- 🌙 **Dark Mode** - Full dark mode support
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Real-time Updates** - Using React Query for efficient data fetching

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** TanStack Query (React Query)
- **Authentication:** Clerk
- **Voice AI:** Vapi

### Backend
- **Runtime:** Node.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Email:** Resend + React Email
- **API:** Next.js API Routes

### DevOps & Tools
- **Deployment:** Vercel (recommended)
- **Version Control:** Git
- **Package Manager:** npm/yarn/pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- npm/yarn/pnpm package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/dentwise.git
cd dentwise
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Vapi AI
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_assistant_id

# Resend Email
RESEND_API_KEY=re_...

# Admin
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📖 Usage

### Patient Flow

1. **Sign Up/Sign In**
   - Create an account or sign in with existing credentials
   - Profile automatically synced via Clerk

2. **Dashboard Access**
   - View personalized dashboard with health metrics
   - See upcoming appointments at a glance

3. **Voice Assistant**
   - Navigate to the Voice page
   - Click "Start Call" to begin AI consultation
   - Ask dental health questions naturally
   - Receive instant voice responses

4. **Book Appointments**
   - Go to Appointments page
   - Select preferred dentist
   - Choose date, time, and appointment type
   - Confirm booking
   - Receive email confirmation

5. **Upgrade to Pro**
   - Access unlimited AI voice calls
   - Get priority support
   - View pricing options in Pro page

### Admin Flow

1. **Access Admin Panel**
   - Sign in with admin email
   - Navigate to `/admin`

2. **Manage Doctors**
   - Add new dentists with profiles
   - Edit existing doctor information
   - Toggle doctor availability

3. **View Analytics**
   - Monitor total appointments
   - Track completed consultations
   - View active doctors count

## 📁 Project Structure

```
dentwise/
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── about/               # About page
│   ├── admin/               # Admin dashboard
│   ├── api/                 # API routes
│   ├── appointments/        # Appointment booking
│   ├── dashboard/           # User dashboard
│   ├── pro/                 # Pricing page
│   ├── voice/               # Voice assistant
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── Providers.tsx        # App providers
├── components/
│   ├── admin/               # Admin components
│   ├── appointments/        # Appointment components
│   ├── dashboard/           # Dashboard components
│   ├── email/               # Email templates
│   ├── landing/             # Landing page components
│   ├── pro/                 # Pricing components
│   ├── ui/                  # Reusable UI components
│   ├── voice/               # Voice assistant components
│   └── UserSync.tsx         # User synchronization
├── hooks/                   # Custom React hooks
├── lib/
│   ├── actions/             # Server actions
│   ├── prisma.ts            # Prisma client
│   ├── resend.ts            # Resend client
│   ├── utils.ts             # Utility functions
│   └── vapi.ts              # Vapi client
├── prisma/
│   ├── migrations/          # Database migrations
│   └── schema.prisma        # Database schema
└── public/                  # Static assets
```

## 🔌 API Routes

### Appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get specific appointment

### Email
- `POST /api/send-appointment-email` - Send appointment confirmation

## 🗄️ Database Schema

### User
- Stores user information from Clerk
- Links to appointments

### Doctor
- Dentist profiles and information
- Availability status
- Appointment relationships

### Appointment
- Booking details (date, time, duration)
- Status tracking
- Patient and doctor relationships

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Clerk](https://clerk.com/) - Authentication
- [Vapi](https://vapi.ai/) - Voice AI
- [Prisma](https://www.prisma.io/) - Database ORM
- [Resend](https://resend.com/) - Email service
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/dentwise](https://github.com/yourusername/dentwise)

---

<div align="center">
  Made with ❤️ by Your Name
</div>
