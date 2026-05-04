# Daara Pari - Farmstay Website

A modern, minimal, and deeply personal website for Daara Pari, a slow-living farmstay and homestay located in Sambok Village, West Sikkim. The design reflects the raw, unpolished beauty of the Himalayas, written from the authentic, first-person perspective of the host, Sristi.

## Tech Stack
- **HTML5** for semantic structure
- **Tailwind CSS** for rapid, utility-first styling and responsive design
- **Vanilla JavaScript** for interactive elements (scroll reveals, night-to-day transitions, dynamic navbar)
- **Vite** as the frontend build tool for a fast and optimized development experience

---

## Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. You can verify this by running:
```bash
node -v
npm -v
```

### Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd daara-api-gemini
   ```

2. **Install dependencies**:
   Run the following command to install all necessary packages (like Vite and Tailwind CSS) defined in `package.json`:
   ```bash
   npm install
   ```

### Running the Development Server

To start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

- This will start Vite and output a local server URL in your terminal (usually `http://localhost:5173`).
- Open that URL in your browser. Any changes you make to the HTML, CSS, or JS files will automatically refresh in the browser.

### Building for Production

When you are ready to deploy the website to a live server (like Vercel, Netlify, or GitHub Pages), you need to create an optimized production build:

```bash
npm run build
```

- This command will bundle and minify all your HTML, CSS, and JavaScript.
- The compiled output will be placed in a new `dist/` directory.
- You can test the production build locally before deploying by running:
  ```bash
  npm run preview
  ```

---

## Project Structure

- `index.html`: The home page featuring the night-to-day hero transition.
- `stay.html`: Details about the Mud House and Main House.
- `experience.html`: Information about village walks, farm activities, and slow living.
- `story.html`: The history of Daara Pari, BB Daju, and Sristi's vision.
- `booking.html`: The enquiry form and contact details.
- `style.css`: Base Tailwind imports and custom utilities (like hiding scrollbars).
- `main.js`: Core logic for the navbar scroll effects, scroll reveal animations, and the hero lamp interaction.
- `tailwind.config.js`: Tailwind configuration including custom colors (`forest`, `beige`, `mud`, `mist`) and font families (serif, sans, hindi).
- `public/`: Static assets like images. Images placed here can be referenced directly (e.g., `/images/hero.png`).

## Next Steps for the Host
1. **Images**: Ensure all high-quality photos of the property, Sristi, and BB Daju are placed in the `public/images/` folder with the correct filenames (e.g., `hero.png`, `mudhouse-1.jpg`, `sristi.jpg`).
2. **Form Integration**: The booking form is currently set up for UI testing. You will need to connect the form's `action` attribute to a service like [Formspree](https://formspree.io/) or your backend API to actually receive emails from guests.
