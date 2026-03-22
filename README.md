# 🧑‍💻 The Life of a Developer

> *An Awwwards-level interactive storytelling web experience that narrates the emotional and technical journey of a developer — from their first "Hello World" to becoming a builder.*

---

## ✨ Live Demo

Run locally with `npm run dev` → open [http://localhost:5173](http://localhost:5173)

---

## 🎬 Story Structure

The experience is divided into **5 cinematic scenes**, each unlocked through interaction:

| Scene | Title | Interaction |
|-------|-------|-------------|
| 1 | **The Beginning** | Type `console.log("Hello World")` to unlock the journey |
| 2 | **The Excitement** | Click HTML → CSS → JS to progress your skills |
| 3 | **The Reality Hit** | Find and fix the logic bug `if (user = "admin")` |
| 4 | **The Growth** | Drag & explore 5 interactive project cards |
| 5 | **The Transformation** | Cinematic finale — *"Welcome to the world of builders."* |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React + Vite** | Core framework (JavaScript / JSX) |
| **Material UI (MUI)** | Theming, layout, responsive components |
| **Framer Motion** | Component animations, drag mechanics, layout transitions |
| **GSAP + ScrollTrigger** | Scroll-based storytelling timelines |
| **Lenis** | Ultra-smooth scroll inertia |
| **Three.js + React Three Fiber** | Interactive 3D background canvas |
| **React Three Drei** | 3D helpers (Float, MeshDistortMaterial) |
| **react-type-animation** | Typewriter narrative text |
| **lucide-react** | Icon set |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── HeroSection.jsx       # Scene 1 — Console lock interaction
│   │   ├── LearningPhase.jsx     # Scene 2 — Skill unlock progression
│   │   ├── DebuggingChaos.jsx    # Scene 3 — Bug fix + terminal
│   │   ├── ProjectsShowcase.jsx  # Scene 4 — Draggable project cards
│   │   └── FinaleSection.jsx     # Scene 5 — Cinematic conclusion
│   ├── ThreeBackground.jsx       # Fixed 3D animated canvas
│   └── MusicPlayer.jsx           # Invisible ambient audio player
├── context/
│   └── StoryContext.jsx          # Global narrative state
├── theme.js                      # MUI dark theme configuration
├── App.jsx                       # Root layout + Lenis scroll setup
└── main.jsx                      # Entry point
```

---

## 🎮 Features

- **Immersive Narrative** — Every section unfolds a slice of a developer's real journey
- **Interactive 3D Background** — A scroll-linked wireframe icosahedron built with Three.js
- **Draggable Project Cards** — Framer Motion physics-based drag on all project cards
- **Ambient Soundtrack** — Background music with zero UI distractions
- **Glitch & Chaos Effects** — Red-tinted Debugging section with a live logic error to fix
- **Interactive Terminal** — Type dev-humour commands in the terminal
- **Cinematic Finale** — Staggered text reveals + stats board + "Start Again" button
- **Fully Responsive** — Fluid typography and stacked layouts for all screen sizes

---

## 🎨 Design Language

- **Dark mode first** — `#0a0a0a` base with translucent glassmorphism layers
- **Neon accents** — Cyan `#00f0ff` and Purple `#bc13fe`
- **Monospace typography** — `Fira Code` for all narrative and code text
- **Smooth 60fps** — GSAP lag-smoothing + Lenis scroll ensure buttery performance

---

## 📦 Key Dependencies

```json
{
  "react": "^19",
  "@mui/material": "^6",
  "framer-motion": "^12",
  "gsap": "^3",
  "lenis": "^1",
  "three": "^0.175",
  "@react-three/fiber": "^9",
  "@react-three/drei": "^10",
  "react-type-animation": "^3",
  "lucide-react": "^0.483"
}
```

---

## 👨‍💻 Author

Built with ❤️ and too much ☕ by **Lucky Joshi**
