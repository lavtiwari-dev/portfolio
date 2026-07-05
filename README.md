# 💻 Developer Portfolio

Welcome to **lav Portfolio**—a premium, responsive, developer-centric personal portfolio built with **React**, **Vite**, and **Sass/SCSS**. Featuring a terminal and code-editor themed aesthetic, this portfolio features elegant interactive sections, dynamic theme engines, and high-performance micro-animations powered by **Framer Motion**.

---

## 🚀 Key Features

*   **Dynamic Theme Engine**: Full support for Dark (default) and Light themes. Integrates persistent storage (`localStorage`) and toggles terminal elements, backdrop colors, scrollbars, selection colors, and code block styles.
*   **Terminal & IDE Aesthetic**: Features file-like tabs, syntax highlighting, line numbers, and developer details mapped directly onto editor-style mock frames.
*   **Interactive Skills Grid**: Brand-colored skill pills that dynamically adjust backgrounds, borders, hover shadows, and rotation scale in both modes. Utilizes CSS `color-mix` dynamically under the hood.
*   **Detailed Project Showcases**: Group and filter projects with custom status badges (`live`, `in progress`, `archived`). Clicking projects opens modal lightboxes displaying full descriptions, features list, live demos, repository links, and interactive file preview tabs.
*   **Timeline Chronology**: Beautiful alternating education timeline with active-card pulsing and hover timeline connectors.
*   **High Performance & SEO Optimized**: Clean semantic HTML structure, Google Fonts integration (`Inter` and `JetBrains Mono`), Fast Vite asset bundling, and responsive images.
*   **Responsive Component Architecture**: Standardized container queries (`container-type: inline-size`) and custom breakpoints ensure layout flexibility down to small mobile screen widths.

---

## 🛠️ Tech Stack

| Technology | Purpose | Key Library/Version |
| :--- | :--- | :--- |
| **Core Framework** | Component Architecture | React 19 / Vite 8 |
| **Styling Engine** | Modular variables, utility mixins, themes | Sass/SCSS (`sass`) |
| **Animations** | Fluid transitions and exit/entry springs | Framer Motion |
| **Observer API** | Dynamic scroll-linked scroll entry | React Intersection Observer |
| **Icons** | Developer & Tech icons | React Icons (`fa`, `si`, `vsc`, `fi`, `tb`) |

---

## 📂 Project Structure

Here is a look at the portfolio folder structure:

```text
portfolio/
├── dist/                     # Optimized production build artifacts
├── public/                   # Static assets (images, badges, favicon)
├── src/
│   ├── components/           # Modular visual components
│   │   ├── About/            # Bio section & profile image card
│   │   ├── BackToTop/        # Floating quick scroll button
│   │   ├── Certifications/   # Lightbox certificates gallery
│   │   ├── Contact/          # Footer form & links
│   │   ├── Education/        # Chronological timeline component
│   │   ├── Footer/           # Copyright & page footer
│   │   ├── Hero/             # Intro splash page with typing header
│   │   ├── LineGutter/       # Vertical layout editor guidelines
│   │   ├── Loader/           # Splash loading terminal animation
│   │   ├── Navbar/           # Responsive navigation & theme toggles
│   │   ├── Projects/         # Interactive filtered project portfolio
│   │   └── Skills/           # Dynamic CSS-colored skill pills grid
│   ├── styles/               # Global styling setup
│   │   ├── _variables.scss   # Global SASS colors, font variables, and design tokens
│   │   └── global.scss       # Global CSS styles and layout resets
│   ├── App.jsx               # Main React entry component handling themes
│   ├── main.jsx              # Main React client mount entrypoint
│   └── index.css             # Main styling entrypoint
├── index.html                # Application template HTML5 file
├── package.json              # Dependencies and scripts definitions
├── vite.config.js            # Vite configuration details
└── README.md                 # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites

*   **Node.js**: `v20.x` or later
*   **npm**: `v10.x` or later

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/lavtiwari-dev/portfolio.git
    cd portfolio
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Development Server

Start the local development server:
```bash
npm run dev
```
Open `http://localhost:5174/` (or the port shown in your terminal) to view the application.

### Production Build

To compile and optimize the assets for production deployment:
```bash
npm run build
```

To preview the built assets locally:
```bash
npm run preview
```

---

## 🎨 Styling & Theme Customization

You can easily customize the portfolio's color scheme, fonts, margins, and responsiveness inside:
👉 `src/styles/_variables.scss`

### Core Theme Variables
*   **Backgrounds (`--bg`, `--bg-alt`)**: The foundation colors of sections and pages.
*   **Panels (`--panel`, `--panel-alt`)**: Background color profiles for cards, header blocks, and menus.
*   **Accents (`--accent`, `--cursor`)**: The highlight colors for buttons, links, and indicators.
*   **Theme Switch (`[data-theme='light']`)**: Override variables to customize light-theme hues, shadows, selection states, and border parameters.

---

## 📜 License

This project is open-source and available under the **MIT License**. Feel free to fork, customize, and build upon it to showcase your work!
