# Amazon Clone (SDE Intern Fullstack Assignment)

A production-grade E-Commerce web application that replicates Amazon's UI/UX.

## 🚀 Live Demo
- **Frontend (Vercel):** [https://amazon-clone-project-red.vercel.app](https://amazon-clone-project-red.vercel.app)
- **Backend (Render):** [https://amazon-clone-project-721k.onrender.com](https://amazon-clone-project-721k.onrender.com)

## ✨ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Framer Motion, Lucide React
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Hosted on Render)
- **ORM:** Sequelize

## 📦 Core Features
- **Product Listing:** Filterable grid with category support and professional Amazon-style cards.
- **Product Detail Page:** Interactive image gallery, specifications, and "Buy Box" logic.
- **Shopping Cart:** Full quantity management and guest/user persistence via SQL relationships.
- **Order Placement:** Multi-step checkout with relational order tracking and confirmation IDs.
- **Responsive Design:** Optimized for mobile, tablet, and desktop viewing.

## 🛠️ Setup Instructions

### Backend
1. `cd backend_node`
2. `npm install`
3. Create `.env` file with your `DATABASE_URL` (PostgreSQL).
4. Run `node seed_sql.js` to initialize the database schema and sample data.
5. Start with `npm start`.

### Frontend
1. `cd Frontend/amazon_store`
2. `npm install`
3. Update `src/utils/api.js` with your backend URL.
4. Run `npm run dev`.

## 📌 Assumptions & Decisions
- **Local Asset Hosting:** Images are hosted in `/public/images` to bypass browser "Tracking Prevention" issues (404/403) from manufacturer CDNs.
- **Relational Persistence:** Guest carts are tracked using a `default_guest` session ID to ensure functionality without mandatory login.
- **SQL Migration:** Successfully migrated from MongoDB to PostgreSQL to meet technical requirements.
