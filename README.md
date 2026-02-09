
# 🌾 Rural Brand Builder AI

**Rural Brand Builder AI** is an intelligent branding workshop designed to empower rural business owners, educators, and community organizers. Built for the *Passport to Earning* curriculum, this tool simplifies the process of creating a professional visual identity using state-of-the-art Generative AI.

## 🚀 Project Overview

In many rural areas, high-quality graphic design services are inaccessible or expensive. This application provides a "virtual design agency" experience, guiding users through a structured branding process to generate:
- **Brand Slogans & Values:** Persuasive messaging tailored to local communities.
- **Color Palettes & Typography:** Visually cohesive schemes based on industry-specific psychology.
- **AI-Generated Logos:** Unique, minimalist icons representing the business essence.
- **Promotional Posters:** Ready-to-print marketing materials for physical distribution.

## 🛠️ Technical Stack

- **Framework:** React 19 (Functional Components, Hooks)
- **AI Engine:** Google Gemini API
  - `gemini-3-flash-preview`: For generating creative copy, JSON-structured brand guidelines, and color theory logic.
  - `gemini-2.5-flash-image`: For generating high-quality 1K logos and 9:16 promotional posters.
- **Styling:** Tailwind CSS (Responsive, mobile-first design)
- **Icons:** Font Awesome 6
- **Typography:** Google Fonts (Inter, Playfair Display, Handlee)

## 📋 The 6-Step Workshop Process

1.  **Category Selection:** Users choose from five curriculum-aligned tracks (Woman-Led Business, Govt School, Farm Product, Crowdfunding, or Community Awareness).
2.  **Basic Details:** Inputting the business name and core purpose.
3.  **Visual Identity:** The AI suggests a slogan, secondary description, and a 5-color hex palette.
4.  **Logo Design:** Generation of a minimalist vector-style logo based on the brand's unique icons.
5.  **Brand Guidelines:** A summary view of the brand "DNA" in a dark-mode professional layout.
6.  **Poster Launch:** Final generation of a vibrant marketing poster designed for social media or physical printing.

## 🎯 Curriculum Categories

The app is hard-coded to support five specific rural development goals:
- **Woman-Led Small Business:** Supporting stitching centers, parlours, and shops.
- **Government School Awareness:** Building trust in public education.
- **Farmer-Led Product:** Marketing organic produce and agricultural innovations.
- **Crowdfunding for Need:** Respectful and clear communication for community support.
- **Community Awareness:** Promoting health, safety, and environmental drives.

## 🔒 Security & Performance

- **Direct API Integration:** Uses the latest `@google/genai` SDK for low-latency streaming and content generation.
- **Responsive UI:** Fully optimized for tablets and mobile devices often used in rural areas.
- **Privacy Centric:** No user data is stored; all brand identities are generated on-the-fly and can be downloaded/printed locally.
