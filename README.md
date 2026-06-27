# 📚 Personal Portfolio (po3)

Welcome to **po3**, a sleek, modern personal portfolio built with **React**, **Vite**, and **Framer Motion**. This project showcases certifications, skills, projects, and more, with a premium design that adapts beautifully to every screen size.

---

## ✨ Features
- **Responsive design** – works flawlessly on mobile, tablet, and desktop (container queries for true component‑level responsiveness).
- **Animated cards** – smooth entry animations using Framer Motion.
- **Lightbox preview** – click a certification badge to view a larger image.
- **Dark‑mode first** – elegant dark theme with a light‑theme toggle.
- **Dynamic typography** – Google‑Font based, modern `Inter` and `JetBrains Mono`.
- **Highly customizable** – SCSS variables let you tweak colours, spacing, and breakpoints easily.

---

## 🛠️ Tech Stack
- **React 18** (hooks, functional components)
- **Vite** – fast dev server & bundler
- **Framer Motion** – animation library
- **Sass/SCSS** – for modular, maintainable styling
- **React‑intersection‑observer** – trigger animations on scroll
- **React‑icons** – clean vector icons

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v20 or later) with npm

### Installation
```bash
# Clone the repo
git clone https://github.com/your-username/po3.git
cd po3

# Install dependencies
npm install
```

### Development
```bash
npm run dev
```
Open `http://localhost:5173` in your browser. The dev server supports hot‑module replacement, so changes appear instantly.

### Build for Production
```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 📂 Project Structure
```
po3/
├─ src/
│  ├─ components/          # UI components (Certifications, Skills, Projects, …)
│  │   └─ Certifications/
│  │       ├─ Certifications.jsx
│  │       └─ Certifications.module.scss
│  ├─ styles/               # Global SCSS variables & helpers
│  ├─ App.jsx                # Root component
│  └─ main.jsx               # Vite entry point
├─ public/                  # Static assets (images, favicons)
└─ README.md                # **You are here**
```

---

## 🎨 Design Notes
- **Container Queries** (`container-type: inline-size`) give each certification card its own responsive context, eliminating layout breakage on unusual screen widths.
- The **footer** of each card now stacks vertically when the card shrinks below 255 px (max‑width: 255px), ensuring the *Verified* button never overlaps the *Passed* text.
- The **lightbox close button** is a fixed circular button with a subtle backdrop blur, staying fully accessible on mobile.

---

## 📜 License
This project is open‑source. Feel free to fork, remix, or use parts of it in your own portfolio.

---

## 🙏 Acknowledgments
- Icons from **react‑icons**
- Animations powered by **Framer Motion**
- Layout inspiration from modern UI/UX patterns (glassmorphism, subtle micro‑animations).

---

*Happy coding!*
