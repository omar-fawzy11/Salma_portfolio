# Dr. Salma Mahmoud Soliman, Pharm.D. — Personal Portfolio Website

A modern, elegant, bespoke personal portfolio website crafted for **Dr. Salma Mahmoud Soliman**, Doctor of Pharmacy (Pharm.D.) graduate and clinical pharmacist based in Alexandria, Egypt.

Designed with a calming healthcare-inspired aesthetic: deep muted sage green accents (`#3D6E52` / `#52996D` in dark mode), warm cream paper tones (`#F9F8F5`), and dark charcoal slate typography (`#242E35`).

---

## 📁 Project Structure

```
salma portfolio/
├── index.html                       # Semantic HTML5 document with full i18n & data-theme attributes
├── css/
│   └── style.css                    # Custom CSS3 design system with Dark Theme & RTL support
├── js/
│   ├── translations.js              # Complete English & Arabic translation dictionaries
│   └── main.js                      # Theme switcher, i18n switcher, ScrollSpy, CV actions, form validation
├── assets/
│   ├── Salma_Mahmoud_Soliman_CV.pdf # Official attached CV PDF (135 KB)
│   └── Salma_Soliman_PharmD_CV.html # Standalone printable HTML Curriculum Vitae
└── README.md                        # Documentation
```

---

## ✨ Key Additions & Features

1. **Dark Mode Toggle**:
   - One-click toggle button in the header (`#themeToggle`) with animated Sun / Moon icons.
   - Clinical slate & dark sage aesthetic preserving readability and visual calmness.
   - Automatically detects OS preference (`prefers-color-scheme: dark`) and persists user preference across visits via `localStorage`.

2. **English & Arabic (العربية) Language Switcher**:
   - One-click language button in the header (`#langToggle`).
   - Native bidirectional support (`dir="rtl"` and `lang="ar"`).
   - High-grade Arabic typography using Google Fonts **Readex Pro**.
   - Fully translates all sections, metadata, labels, forms, metrics, tags, and feedback messages.
   - Persists language choice via `localStorage`.

3. **CV Download Button**:
   - The primary **"Download CV"** button in the hero and modal links directly to the official **`assets/Salma_Mahmoud_Soliman_CV.pdf`** file with automatic download attributes.
   - Also provides a "View CV in Browser" preview option in the CV modal.

---

## 🚀 How to Run & Preview

Open `index.html` in any browser:
- Double-click `index.html` in Windows File Explorer, or
- Run a local static server:
  ```powershell
  python -m http.server 8000
  ```
  and visit `http://localhost:8000`.
