import fs from 'fs';
import path from 'path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // Standard A4 size in points
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Color Palette (ATS-Friendly High Contrast Professional Theme)
  const primaryColor = rgb(0.03, 0.04, 0.06);     // #080A0F Deep Slate/Black
  const accentColor = rgb(0.02, 0.45, 0.82);      // #0672D1 Rich Blue / Sky Accent
  const secondaryText = rgb(0.25, 0.28, 0.35);    // Slate Grey
  const lightBg = rgb(0.96, 0.97, 0.99);          // Subtle light divider fill

  let cursorY = height - 50;
  const leftMargin = 50;
  const contentWidth = width - leftMargin * 2;

  // Helper for drawing lines
  function drawDivider(y) {
    page.drawLine({
      start: { x: leftMargin, y },
      end: { x: width - leftMargin, y },
      thickness: 1,
      color: rgb(0.85, 0.88, 0.92),
    });
  }

  // --- HEADER SECTION ---
  page.drawText('YUU (BAYU ANGGARA)', {
    x: leftMargin,
    y: cursorY,
    size: 22,
    font: fontBold,
    color: primaryColor,
  });
  cursorY -= 20;

  page.drawText('SENIOR FULL STACK WEB DEVELOPER & AI ENGINEER ASPIRANT', {
    x: leftMargin,
    y: cursorY,
    size: 11,
    font: fontBold,
    color: accentColor,
  });
  cursorY -= 16;

  page.drawText(
    'Email: yulverynthbusiness@gmail.com   |   LinkedIn: linkedin.com/in/bayu-anggara-715b813b2   |   GitHub: github.com/Arterouss',
    {
      x: leftMargin,
      y: cursorY,
      size: 8.5,
      font: fontRegular,
      color: secondaryText,
    }
  );
  cursorY -= 12;
  page.drawText('Location: Bandung, Indonesia   |   Availability: 100% Remote / Global Collaboration   |   Experience: 4+ Years', {
    x: leftMargin,
    y: cursorY,
    size: 8.5,
    font: fontRegular,
    color: secondaryText,
  });
  cursorY -= 14;
  drawDivider(cursorY);
  cursorY -= 18;

  // --- PROFESSIONAL SUMMARY ---
  page.drawText('PROFESSIONAL SUMMARY', {
    x: leftMargin,
    y: cursorY,
    size: 11,
    font: fontBold,
    color: primaryColor,
  });
  cursorY -= 14;

  const summaryText =
    'Passionate Senior Full Stack Web Developer dedicated to building high-velocity, visually stunning web applications that deliver exceptional user experiences. With over 4 years of deep technical immersion across modern JavaScript ecosystems, cloud architecture, and frontend systems, I transform complex requirements into fast, intuitive, and highly scalable web platforms combining zero-compromise engineering with premium spatial design.';
  
  // Simple word wrap helper
  function drawWrappedText(text, x, y, size, font, color, maxWidth, lineSpacing = 13) {
    const words = text.split(' ');
    let currentLine = '';
    let currentY = y;
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const textWidth = font.widthOfTextAtSize(testLine, size);
      if (textWidth > maxWidth && currentLine !== '') {
        page.drawText(currentLine, { x, y: currentY, size, font, color });
        currentLine = word;
        currentY -= lineSpacing;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      page.drawText(currentLine, { x, y: currentY, size, font, color });
      currentY -= lineSpacing;
    }
    return currentY;
  }

  cursorY = drawWrappedText(summaryText, leftMargin, cursorY, 9.2, fontRegular, secondaryText, contentWidth, 12.5);
  cursorY -= 6;
  drawDivider(cursorY);
  cursorY -= 15;

  // --- TECHNICAL SKILLS & COMPETENCIES ---
  page.drawText('TECHNICAL SKILLS & CORE COMPETENCIES', {
    x: leftMargin,
    y: cursorY,
    size: 10.5,
    font: fontBold,
    color: primaryColor,
  });
  cursorY -= 14;

  const skills = [
    { label: 'Frontend Engineering:', val: 'Next.js 16 (App Router), TypeScript, React 19, Tailwind CSS v4, Framer Motion, GSAP, 3D Glassmorphism' },
    { label: 'Backend Architecture:', val: 'Node.js, PHP, Laravel Framework, RESTful APIs, Firebase Cloud Firestore, MySQL, Serverless Systems' },
    { label: 'Cloud & Performance:', val: 'Vercel Deployment, GPU-Accelerated CSS Lighting, 100% Lighthouse Performance, Encrypted Relay APIs' },
    { label: 'Engineering Practices:', val: 'Type-Safe Architecture, Git / GitHub Workflows, Agile Methodology, AI Systems & Prompt Engineering' },
  ];

  for (const skill of skills) {
    page.drawText(skill.label, { x: leftMargin, y: cursorY, size: 9.2, font: fontBold, color: primaryColor });
    // Properly wrap the skill values so they NEVER clip or overflow horizontally across the right margin
    const nextY = drawWrappedText(skill.val, leftMargin + 135, cursorY, 9.2, fontRegular, secondaryText, contentWidth - 135, 12);
    cursorY = nextY - 4;
  }
  cursorY -= 4;
  drawDivider(cursorY);
  cursorY -= 15;

  // --- PROFESSIONAL EXPERIENCE & MILESTONES ---
  page.drawText('PROFESSIONAL EXPERIENCE & MILESTONES', {
    x: leftMargin,
    y: cursorY,
    size: 10.5,
    font: fontBold,
    color: primaryColor,
  });
  cursorY -= 14;

  // Milestone 1
  page.drawText('E-Learning Platform Developer (Magang/Internship)', { x: leftMargin, y: cursorY, size: 10, font: fontBold, color: primaryColor });
  page.drawText('2026', { x: width - leftMargin - 35, y: cursorY, size: 9.5, font: fontBold, color: accentColor });
  cursorY -= 12;
  page.drawText('Yota Adiwidya Center', { x: leftMargin, y: cursorY, size: 9.2, font: fontOblique, color: secondaryText });
  cursorY -= 13;
  
  const yotaPoints = [
    'Spearheaded the backend and web architecture of an enterprise-grade E-Learning web portal utilizing PHP and Laravel Framework.',
    'Engineered relational database schemas in MySQL for structured course delivery, interactive modules, and student progression tracking.',
    'Optimized application performance through clean repository patterns, robust validation, and responsive UI integration.',
  ];
  for (const pt of yotaPoints) {
    page.drawText('•', { x: leftMargin + 5, y: cursorY, size: 9.2, font: fontBold, color: accentColor });
    cursorY = drawWrappedText(pt, leftMargin + 18, cursorY, 9.2, fontRegular, secondaryText, contentWidth - 18, 12);
  }
  cursorY -= 6;

  // Milestone 2
  page.drawText('Next Career Milestone: AI Engineer / Full Stack Specialist', { x: leftMargin, y: cursorY, size: 10, font: fontBold, color: primaryColor });
  page.drawText('Coming Soon', { x: width - leftMargin - 65, y: cursorY, size: 9, font: fontBold, color: accentColor });
  cursorY -= 13;
  cursorY = drawWrappedText(
    'Actively researching and preparing for deep immersion into Artificial Intelligence engineering, LLM application architecture, and multi-agent system workflows.',
    leftMargin + 18,
    cursorY,
    9.2,
    fontRegular,
    secondaryText,
    contentWidth - 18,
    12
  );
  cursorY -= 8;
  drawDivider(cursorY);
  cursorY -= 15;

  // --- EDUCATION ---
  page.drawText('EDUCATION & ACADEMIC BACKDROP', {
    x: leftMargin,
    y: cursorY,
    size: 10.5,
    font: fontBold,
    color: primaryColor,
  });
  cursorY -= 14;

  page.drawText('Universitas Informatika dan Bisnis Indonesia (UNIBI)', { x: leftMargin, y: cursorY, size: 10, font: fontBold, color: primaryColor });
  page.drawText('2023 — Present', { x: width - leftMargin - 75, y: cursorY, size: 9, font: fontBold, color: accentColor });
  cursorY -= 12;
  page.drawText('Bachelor of Computer Science (S1) — Teknik Informatika', { x: leftMargin, y: cursorY, size: 9.2, font: fontOblique, color: secondaryText });
  cursorY -= 13;
  cursorY = drawWrappedText(
    'Core coursework and deep technical focus in Software Engineering, Web Systems Design, Cloud Architecture, Algorithms, and Database Engineering.',
    leftMargin + 18,
    cursorY,
    9.2,
    fontRegular,
    secondaryText,
    contentWidth - 18,
    12
  );
  cursorY -= 8;
  drawDivider(cursorY);
  cursorY -= 15;

  // --- KEY PROJECTS ---
  page.drawText('NOTABLE ENGINEERING PROJECTS', {
    x: leftMargin,
    y: cursorY,
    size: 10.5,
    font: fontBold,
    color: primaryColor,
  });
  cursorY -= 14;

  page.drawText('YuuUnivers — Next.js 16 3D Spatial Portfolio & Cloud Firestore CMS', { x: leftMargin, y: cursorY, size: 9.8, font: fontBold, color: primaryColor });
  cursorY -= 12;
  cursorY = drawWrappedText(
    'Engineered a state-of-the-art web application featuring GPU-accelerated cinematic environmental lighting, 3D floating glassmorphism UI, real-time Firebase authentication & database admin CMS, and FormSubmit.co encrypted contact portal.',
    leftMargin + 18,
    cursorY,
    9.2,
    fontRegular,
    secondaryText,
    contentWidth - 18,
    12
  );

  // Footer / ATS watermark
  page.drawText('ATS-Friendly Professional Resume — Generated via YuuUnivers Engine (2026)', {
    x: leftMargin,
    y: 25,
    size: 7.5,
    font: fontOblique,
    color: rgb(0.5, 0.55, 0.6),
  });

  // Ensure public dir exists and save
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(path.join(publicDir, 'resume.pdf'), pdfBytes);
  console.log('Successfully generated public/resume.pdf!');
}

generateResume().catch((err) => {
  console.error('Error generating resume:', err);
  process.exit(1);
});
