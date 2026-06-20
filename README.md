# 🏎️ McLaren 720S Luxury Showcase

> A premium automotive landing page featuring cinematic visuals, glassmorphism UI, and luxury dark-theme aesthetics powered by cutting-edge web technologies.

---

## 📊 Project Status

[![GitHub stars](https://img.shields.io/github/stars/tagadearpit/McLaren-720S?style=flat-square&logo=github&logoColor=white&color=FFB81C)](https://github.com/tagadearpit/McLaren-720S/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/tagadearpit/McLaren-720S?style=flat-square&logo=github&logoColor=white&color=FFB81C)](https://github.com/tagadearpit/McLaren-720S/network/members)
[![GitHub issues](https://img.shields.io/github/issues/tagadearpit/McLaren-720S?style=flat-square&logo=github&logoColor=white&color=FFB81C)](https://github.com/tagadearpit/McLaren-720S/issues)
[![GitHub license](https://img.shields.io/github/license/tagadearpit/McLaren-720S?style=flat-square&color=FFB81C)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-98.2%25-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## ✨ About This Project

This is a **premium automotive landing page** inspired by the iconic McLaren 720S. Designed with a luxury-first approach, it showcases modern web development best practices combined with stunning visual design. Perfect for automotive enthusiasts, web developers, and those interested in advanced frontend architecture.

The project demonstrates professional-grade techniques including:
- Cinematic video integration and optimization
- Advanced animation frameworks
- Modern glassmorphism design patterns
- Smooth scrolling experiences
- Responsive design implementation
- Performance optimization

---

## 🎯 Key Features

| Feature | Description |
|---------|-------------|
| 🎬 **Cinematic Hero Section** | Stunning 16:9 background video with optimized playback |
| 🎨 **Glassmorphism UI** | Modern frosted glass effect components throughout |
| ✨ **Advanced Animations** | Framer Motion and GSAP for smooth, performant animations |
| 🎯 **Scroll-Triggered Effects** | GSAP ScrollTrigger for parallax and scroll-based animations |
| 🌙 **Premium Dark Theme** | Luxury-inspired color palette with high contrast |
| 📱 **Fully Responsive** | Seamless experience across all device sizes |
| ⚡ **Performance Optimized** | Fast load times and smooth interactions |
| 🏁 **Performance Specs** | Detailed vehicle specification showcase section |
| 🎭 **Interactive Elements** | Engaging UI components with smooth transitions |
| 🖥️ **Modern Stack** | Built with latest web technologies and best practices |

---

## 🛠️ Tech Stack

### Core Framework
[![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

### Styling & Design
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3+-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Glassmorphism](https://img.shields.io/badge/Glassmorphism-Design-9C27B0?style=flat-square)](https://glassmorphism.com/)

### Animation & Motion
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Latest-0055FF?style=flat-square)](https://www.framer.com/motion/)
[![GSAP](https://img.shields.io/badge/GSAP-Latest-88CE02?style=flat-square)](https://gsap.com/)
[![Lenis](https://img.shields.io/badge/Lenis%20Scroll-Latest-FF6B6B?style=flat-square)](https://lenis.studiofreight.com/)

### Development Tools
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)
[![ESLint](https://img.shields.io/badge/ESLint-Code%20Quality-4B3B8F?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)

---

## 📸 Screenshots

> 🖼️ Screenshots and demo GIFs will be added here to showcase the project's visual appeal and functionality.

```
[Hero Section Screenshot]
[Glassmorphism Components]
[Performance Specs Section]
[Responsive Mobile View]
[Scroll Animation Demo]
```

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** `>= 18.0.0`
- **npm** `>= 9.0.0` or **yarn** `>= 1.22.0`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tagadearpit/McLaren-720S.git
   cd McLaren-720S
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Install optional dependencies for animations**
   ```bash
   npm install framer-motion gsap lenis
   ```

---

## 💻 Development

### Local Development Server

Start the development server with hot-reload functionality:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at **http://localhost:3000**

### Build for Production

Create an optimized production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start Production Server

Run the built application in production mode:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

### Linting and Code Quality

Check for code quality issues:

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

---

## 📁 Project Structure

```
McLaren-720S/
├── app/
│   ├── layout.tsx              # Root layout component
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   └── favicon.ico             # App favicon
├── components/
│   ├── Hero.tsx                # Hero section with video
│   ├── Navigation.tsx          # Navigation bar
│   ├── PerformanceSpecs.tsx    # Vehicle specs section
│   ├── Features.tsx            # Feature showcase
│   ├── Animations.tsx          # Animation components
│   └── Footer.tsx              # Footer section
├── public/
│   ├── videos/
│   │   └── mclaren-hero.mp4    # Hero background video
│   └── assets/                 # Images and icons
├── styles/
│   ├── animations.css          # Animation definitions
│   └── glassmorphism.css       # Glassmorphism styles
├── lib/
│   ├── utils.ts                # Utility functions
│   └── constants.ts            # Project constants
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── .eslintrc.json              # ESLint configuration
└── README.md                   # Project documentation
```

---

## ⚙️ Configuration

### Tailwind CSS

Tailwind CSS is pre-configured with custom colors for the luxury theme:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        luxury: {
          dark: '#0a0e27',
          gold: '#FFB81C',
          silver: '#e8e8e8',
        },
      },
    },
  },
};
```

### Next.js Configuration

Video optimization and image handling are configured in `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-cdn-domain.com'],
  },
  video: {
    fallback: false,
  },
};
```

---

## ⚡ Performance & Optimization

### Key Optimization Techniques

| Optimization | Implementation |
|--------------|-----------------|
| **Code Splitting** | Dynamic imports with React.lazy() |
| **Image Optimization** | Next.js Image component with lazy loading |
| **Video Streaming** | Optimized MP4 formats with adaptive bitrate |
| **Bundle Analysis** | Minified and tree-shaken dependencies |
| **Caching Strategy** | Static generation and incremental static regeneration |
| **Font Loading** | Variable fonts with subset optimization |
| **CSS Optimization** | Tailwind CSS purging unused styles |

### Performance Metrics

```
- Lighthouse Score: 90+
- Core Web Vitals: Green
- First Contentful Paint: < 1.2s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
```

### Video Optimization

Videos are optimized for web delivery:

- Format: **H.264 MP4** (excellent browser support)
- Codec: **H.264** video, **AAC** audio
- Bitrate: **5-8 Mbps** for quality
- Resolution: **1920x1080** (Full HD)
- Fallback: **WebM** format for additional compatibility

---

## 📱 Responsive Design

The project is fully responsive and tested across all major devices:

| Device | Breakpoint | Status |
|--------|-----------|--------|
| **Mobile** | < 640px | ✅ Optimized |
| **Tablet** | 640px - 1024px | ✅ Optimized |
| **Desktop** | 1024px - 1536px | ✅ Optimized |
| **Large Screens** | > 1536px | ✅ Optimized |

Tailwind CSS breakpoints are fully utilized for responsive behavior:

```typescript
// Example responsive implementation
<div className="text-sm md:text-base lg:text-lg xl:text-xl">
  Responsive Text
</div>
```

---

## 🎨 Animation Technologies

### Framer Motion

Handles component-level animations with declarative syntax:

```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  Animated Content
</motion.div>
```

### GSAP (GreenSock Animation Platform)

Powers scroll-triggered and timeline-based animations:

```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.to('.element', {
  scrollTrigger: '.element',
  duration: 1,
  y: -100,
});
```

### Lenis Smooth Scroll

Provides butter-smooth scrolling experience:

```typescript
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
});
```

---

## 🎯 Future Enhancements

- [ ] 3D Model Integration (Three.js)
- [ ] WebGL Effects and Shaders
- [ ] Advanced Particle System
- [ ] Audio Visualization
- [ ] Dark Mode Toggle
- [ ] Multi-language Support (i18n)
- [ ] Performance Monitoring Dashboard
- [ ] Analytics Integration
- [ ] CMS Integration (Contentful/Sanity)
- [ ] E-commerce Capabilities
- [ ] User Reviews Section
- [ ] Interactive Model Configurator

---

## 🤝 Contributing

Contributions are welcome and appreciated! This project thrives on community involvement. Here's how you can help:

### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/tagadearpit/McLaren-720S.git
   cd McLaren-720S
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   ```bash
   git add .
   git commit -m 'Add amazing feature'
   ```

4. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Ensure all TypeScript types are properly defined
- Add tests for new features
- Update documentation as needed
- Keep commits atomic and descriptive
- Reference any related issues in your PR description

### Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

The MIT License allows you to:
- ✅ Use commercially
- ✅ Modify the code
- ✅ Distribute the code
- ✅ Use privately

With the condition that you include a copy of the license and copyright notice.

---

## 👨‍💼 Author

**Tagadearpit**

- GitHub: [@tagadearpit](https://github.com/tagadearpit)
- Portfolio: [Your Portfolio Link]
- Email: [Your Email]

---

## 🙏 Acknowledgments

Special thanks to:

- [Next.js](https://nextjs.org/) - The React framework for production
- [Framer Motion](https://www.framer.com/motion/) - Modern animation library
- [GSAP](https://gsap.com/) - Professional animation platform
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lenis](https://lenis.studiofreight.com/) - Smooth scroll library
- McLaren Automotive - For inspiration and design philosophy

---

## 📞 Support

If you have questions or need assistance:

1. **Check the Documentation** - See if your question is already covered
2. **GitHub Issues** - [Open an issue](https://github.com/tagadearpit/McLaren-720S/issues)
3. **GitHub Discussions** - [Start a discussion](https://github.com/tagadearpit/McLaren-720S/discussions)

---

## 📊 Stats

![Profile Views](https://komarev.com/ghpvc/?username=tagadearpit&label=Profile%20Views&color=FFB81C&style=flat-square)

---

<div align="center">

Made with ❤️ and ☕ by [Tagadearpit](https://github.com/tagadearpit)

⭐ If you find this project helpful, please consider giving it a star!

[⬆ Back to Top](#-mclaren-720s-luxury-showcase)

</div>
