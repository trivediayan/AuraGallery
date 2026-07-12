# AuraGallery — Inspire Your Vision

A responsive, high-performance, Pinterest-inspired image gallery web application built using **React**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**.

AuraGallery is a sleek curation platform for design inspiration, showcasing a dynamic, custom masonry grid of high-quality placeholder images. It incorporates features like real-time search, category filtering, a detailed preview modal, persistent user favorites, infinite scrolling, and full dark-mode support.

---

## 🌟 Key Features

### 📐 Programmatic Masonry Grid
- A custom masonry algorithm distributes images across columns based on window width rather than using standard CSS column-counts. This maintains horizontal-first order and provides a fluid layout for infinite scrolling.

### 🖼️ Seamless Image Curation
- Pulls high-resolution images from [Lorem Picsum](https://picsum.photos) with varying portrait and landscape aspect ratios.
- Images include native `loading="lazy"` tags and a custom `onLoad` state to animate images from a hidden scale state into a smooth fade-in.

### ⚡ Simulated Network Latency & Shimmer Skeletons
- A custom simulated loading state displays beautiful shimmer skeleton layouts matching the card heights whenever categories change or search queries update.

### 🔍 Real-time Search & Filter Chips
- Search bar with instant results filtering images by title.
- Category chips (Nature, Technology, Food, Travel, Art) filter pins on click.

### 💾 Persistent Likes & Saves
- A custom `useLocalStorage` hook persists liked and saved items directly inside the browser.
- Likes animate with a vibrant pink toggle, and saves have a dedicated state.

### 🌓 Dark Mode Toggle
- Full light-to-dark theme transitions, persisting the user's preference in `localStorage` and syncing with the HTML document element.

### 🌀 Framer Motion Animations
- Elegant card entry fade-ins, sub-navigation transitions, and modal zoom effects.

### 💬 Detailed Preview Modal
- Open any card to view detailed description, creator info, download options, and a "More Like This" recommendations panel featuring cards from the same category.

---

## 📁 Project Structure

The project has been organized into modular React subdirectories:

```text
/src
  ├── assets/          # Static icons or default graphics
  ├── components/      # Reusable UI elements
  │     ├── FilterChips.jsx    # Category filtering row
  │     ├── MasonryGrid.jsx    # Programmatic column distributor
  │     ├── Navbar.jsx         # Header navigation and search
  │     ├── PinCard.jsx        # Individual interactive card
  │     ├── PreviewModal.jsx   # Detailed overlay view
  │     └── SkeletonCard.jsx   # Shimmering placeholder cards
  ├── data/            # Local data source
  │     └── mockData.js        # 60 static image items
  ├── hooks/           # Custom React hooks
  │     ├── useInfiniteScroll.js  # IntersectionObserver trigger
  │     └── useLocalStorage.js    # Local state persistence
  ├── pages/           # Page views
  │     ├── Home.jsx           # Main exploration feed
  │     └── Favorites.jsx      # User collections and likes
  ├── App.jsx          # App layout, state wiring, and theme controller
  ├── index.css        # Tailwind CSS directives & global scrollbars
  └── main.jsx         # React application entry point
```

---

## 🛠️ Setup & Installation

Follow these steps to run the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed on your system.

### 1. Extract/Navigate to the Project Folder
Set this folder as your active workspace:
```bash
C:\Users\Admin\.gemini\antigravity\scratch\pinterest-gallery
```

### 2. Install Dependencies
Run the package manager setup command:
```bash
npm install
```

### 3. Run Development Server
Start the local server:
```bash
npm run dev
```
Open your browser and navigate to the local port (usually `http://localhost:5173`) to view the application.

### 4. Build for Production
To bundle and optimize the project:
```bash
npm run build
```
The output bundle will be created inside the `/dist` directory.

---

## 🎨 Tech Stack & Styling

- **Core**: React v19, Vite v8
- **Styling**: Tailwind CSS v4, PostCSS, Autoprefixer
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: Inter (body copy), Outfit (headings and branding)
