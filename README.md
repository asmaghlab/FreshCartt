# FreshCart E-Commerce 🛒

FreshCart is a modern, responsive, and fully-featured E-Commerce application built with React, Vite, and Tailwind CSS. It communicates with the **Route Ecommerce API** to deliver a seamless shopping experience.

## ✨ Features
- **Authentication**: Secure Login & Signup with protected routes.
- **Product Catalog**: Advanced Search and Server-Side Pagination for thousands of products.
- **Dynamic Categories & Brands**: Dedicated pages for parsing deeply-nested subcategories and specific brand filtering.
- **Global Wishlist**: Persisted wishlist context allowing users to seamlessly save and remove products from anywhere in the app.
- **Shopping Cart & Checkout**: Fully managed cart state with real-time total calculations.
- **Aesthetic UI**: High-resolution imagery, subtle micro-animations, and smooth transitions powered by Tailwind.
- **Responsive**: 100% Mobile-first responsive grids and components.

## 🛠️ Technology Stack
- **Frontend Framework**: React 18 (Vite)
- **Routing**: React Router DOM (v6)
- **Styling**: Tailwind CSS & Vanilla CSS
- **State Management**: React Context API
- **Icons & Alerts**: Lucide React, FontAwesome, React Toastify
- **Carousels**: Swiper.js
- **SEO Elements**: React Helmet

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation
1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd freshCart
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To run the development server:
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

## 📖 Project Structure
- `/src/components`: Reusable UI pieces (Navbar, Footer, ProductCart, Loading, Pagination).
- `/src/pages`: Main application views (Home, Categories, Brands, Cart, Checkout, FeaturedProducts).
- `/src/context`: Global state managers (ProductsProvider, WishlistProvider, AuthProvider).
- `/src/services`: API adapters (apiClient.js, category-service, brands-service).

## 💡 Recent V2 Improvements
- Implemented **Server-side Pagination** to handle infinite scaling.
- Rewrote the **Category System** to dynamically fetch subcategories.
- Created beautiful **Aesthetic Home Sliders**.
- Upgraded the **Brands Directory** into an interactive catalog.
