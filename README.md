# ✨ YuuUnivers — Spatial Glassmorphism 3D Portfolio & Cloud CMS

<div align="center">

![Next.js 16](https://img.shields.io/badge/Next.js%2016-App%20Router-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase Cloud Firestore](https://img.shields.io/badge/Firebase-Cloud%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![PHP Laravel](https://img.shields.io/badge/Backend-PHP%20%2F%20Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-38BDF8?style=for-the-badge)

<br />

### *"Crafting Digital Dimensions Where Art Meets Engineering"*

An enterprise-grade, spatial 3D portfolio and real-time cloud content management system architected with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**. Built by **Yuu (Bayu Anggara)** — Senior Full Stack Web Developer & AI Engineer Aspirant.

[Explore Live Universe](https://yuuunivers.vercel.app) • [Download ATS CV](./public/resume.pdf) • [Report An Issue](https://github.com/Arterouss/yuniverse/issues)

</div>

---

## 🌌 Architectural & Design Highlights

### 1. 🌟 GPU-Accelerated Environmental Lighting System
Unlike conventional spotlight cursors that distract from UI content, YuuUnivers introduces a **cinematic environmental ambient lighting engine**. Powered by `requestAnimationFrame` and CSS root variable mapping (`--mouse-norm-x`, `--mouse-norm-y`), large multi-layered radial gradients (#7C3AED purple, #3B82F6 blue, and #EC4899 pink) dynamically illuminate nearby glass surfaces, borders, and textures without compromising 60+ FPS performance.

### 2. 🔮 Zero-Compromise 3D Glassmorphism UI
Designed with custom design tokens (`cosmic-glass`, `cosmic-glass-light`) using advanced backdrop filters and micro-borders. Features interactive 3D floating cards, parallax orbital navigation, and responsive Bento grids.

### 3. 🛡️ Strict Zero-Dummy Data Principle & Real-time Cloud CMS
To maintain professional engineering standards, public views are strictly populated from **Firebase Cloud Firestore**. Includes a built-in, authenticated **Admin Dashboard (`/admin`)** allowing real-time creation, editing, category filtering, and publishing of technical case studies.

### 4. 📄 Automated ATS-Friendly Resume Engine
Integrated with custom Node.js and `pdf-lib` scripting (`scripts/generate-resume.mjs`). Generates pixel-perfect, multi-line auto-wrapped **ATS-Friendly professional PDF resumes (`public/resume.pdf`)** on demand with balanced A4 margins and high-contrast typography.

### 5. 📬 Encrypted Contact Hub & Business Inquiry Portal
Features a multi-option contact terminal including encrypted form relay via `FormSubmit.co` (`yulverynthbusiness@gmail.com`), direct cloud inquiry persistence, and instant community channels.

---

## 🚀 Key Milestones & Case Studies

* **Internship E-Learning Platform Developer — Yota Adiwidya Center (2026):**
  Spearheaded the backend and web architecture of an enterprise-grade E-Learning portal utilizing **PHP and the Laravel Framework**. Engineered relational MySQL database schemas for structured course delivery, interactive modules, and student progression tracking with sub-100ms API response times.
* **Academic Backdrop — UNIBI (Universitas Informatika dan Bisnis Indonesia):**
  Bachelor of Computer Science (S1 Teknik Informatika) undergraduate (2023 — Present), deep-diving into Software Engineering, Cloud Systems, and Algorithm Architecture.
* **Next Career Milestone — AI Engineer / Full Stack Specialist:**
  Actively researching and building intelligent LLM integrations, RAG workflows, and autonomous web agents.

---

## 🛠️ Local Setup & Development

### Prerequisites
* **Node.js** `>= 20.0.0`
* **npm** or **pnpm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/Arterouss/yuniverse.git
cd yuniverse
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the project root containing your Firebase credentials (refer to `.env.example` if available):
```env
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-XXXXXXXXXX"
```

### 4. Launch Development Server (Next.js 16 Turbopack)
```bash
npm run dev
```
Open `http://localhost:3000` in your browser to explore your digital dimension.

---

## 📄 ATS Resume Generation

To re-generate the downloadable ATS-friendly PDF resume after updating your milestones or competencies:
```bash
node scripts/generate-resume.mjs
```
The fresh document will automatically save to `public/resume.pdf`.

---

## 🌐 Connect & Community (GitHub, Discord, LinkedIn)

Feel free to connect, collaborate, or discuss exciting Full Stack and AI Engineering opportunities:

* **Pencipta / Author:** Yuu (Bayu Anggara)
* **GitHub:** [@Arterouss](https://github.com/Arterouss)
* **Discord:** `arterouss` (or connect via GitHub / Email)
* **LinkedIn:** [linkedin.com/in/bayu-anggara-715b813b2](https://linkedin.com/in/bayu-anggara-715b813b2)
* **Email:** [yulverynthbusiness@gmail.com](mailto:yulverynthbusiness@gmail.com)

---

## ⚖️ License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

<div align="center">
  <br />
  <strong>Engineered with precision and passion by YuuUnivers • 2026</strong>
</div>
