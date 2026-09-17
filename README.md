# NoveMart 🛍️

NoveMart is a modern, responsive full-featured e-commerce platform built with React 19, Redux Toolkit, and Tailwind CSS. It features a curated catalog of 220+ items, multi-category filtering, real-time cart state management, checkout with order confirmation, customer reviews, order history tracking, and a full-featured Admin Management Dashboard.

Designed & Developed by **Daim Ali** (Multan, Pakistan).

---

## 🚀 Key Features

### 🛒 Storefront & Shopping Experience
- **Dynamic Catalog:** Search, filter by category (Electronics, Mobile Accessories, Men's Fashion, Footwear, Bags & Accessories, Watches & Jewelry), and sort by price or rating.
- **Product Details & Reviews:** Detailed product pages with high-resolution imagery, quantity selectors, live stock status, and real customer reviews with star ratings.
- **Interactive Cart & Checkout:** Persistent shopping cart (backed by Redux Toolkit + localStorage), promo code support (`NOVAMART10`), estimated shipping calculator, and seamless checkout flow with Cash on Delivery & Card payment options.
- **Order Tracking:** Track order lifecycle states (`Pending` ➔ `Confirmed` ➔ `Shipped` ➔ `Delivered`).

### 🔑 Authentication & Admin Portal
- **Role-Based Access Control:** Distinct roles for Customers and Store Admin (`daimx1214@gmail.com`).
- **Admin Dashboard:** Full control over store inventory — create, update, or remove products, approve/reject customer orders, update delivery status, and view registered accounts.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, React Router v7
- **State Management:** Redux Toolkit, React Redux, React Context API
- **Styling:** Tailwind CSS v4
- **Icons & Assets:** Heroicons, Unsplash curated high-definition product imagery
- **Storage Layer:** Browser LocalStorage Client DB (`src/api/db.js`) with Promise-based asynchronous delay simulation.

---

## 💻 Getting Started

### Installation
```bash
git clone https://github.com/daimali/NoveMart.git
cd NoveMart
npm install
npm run dev
```


---

## 📁 Project Structure

```text
src/
├── api/
│   └── db.js            # Client-side Database & Storage engine
├── components/          # Reusable UI Components (Navbar, Footer, ProductCard, etc.)
├── context/             # AuthContext provider
├── pages/               # Page components (Home, Cart, Checkout, Admin, etc.)
├── redux/               # Redux store & state slices (cartSlice, productsSlice)
├── utils/               # Image helpers and formatting utilities
├── App.jsx              # Main routing architecture
└── main.jsx             # React entry point
```

---

## 👤 Author & Support

- **Developer:** Daim Ali
- **Location:** Multan, Punjab, Pakistan
- **Email:** daimx1214@gmail.com
- **LinkedIn:** [linkedin.com](https://linkedin.com)
- **License:** MIT License
