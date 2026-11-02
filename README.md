# Production-Ready MERN Stack Developer Portfolio

A modern, high-performance, accessible developer portfolio and content management system built with the **MERN Stack** (MongoDB, Express.js, React 18, Node.js) and plain ES6+ JavaScript (**Zero TypeScript**).

Designed with a sleek dark-mode aesthetic featuring deep navy surfaces, violet-to-cyan gradient accents, smooth Framer Motion interactions, responsive navigation, SEO metadata, and an authenticated administrative dashboard.

---

## ⚡ Tech Stack

- **Frontend:**
  - React 18 & Vite
  - React Router v6
  - Tailwind CSS & Custom Design System Tokens
  - Framer Motion (Transitions, Micro-interactions)
  - Axios (HTTP client with interceptors)
  - React Icons
  - React Helmet Async (SEO, Social Graph & JSON-LD `Person` schema)
- **Backend:**
  - Node.js (v18+) & Express.js (ES Modules `"type": "module"`)
  - MongoDB & Mongoose
  - JWT (JSON Web Tokens) & Bcrypt.js
  - Helmet (Security headers) & CORS whitelist
  - Express Rate Limit (DDoS & Spam prevention)
  - Express Validator (Strict request input validation)
  - Nodemailer (Automated email delivery)
  - Multer & Cloudinary (Image uploads with base64 Data URI fallbacks)
- **Tooling:**
  - Concurrently (Run client + server simultaneously)
  - Nodemon (Hot reload for server)

---

## 📁 Monorepo Structure

```
portfolio/
├── client/                     # Frontend React + Vite SPA
│   ├── public/                 # Static assets, favicon, robots.txt, sitemap.xml, resume.pdf
│   ├── src/
│   │   ├── api/                # Axios instance & typed API endpoints
│   │   ├── components/
│   │   │   ├── common/         # Navbar, Footer, ThemeToggle, Lightbox, SEO, Toast, ScrollToTop
│   │   │   ├── projects/       # ProjectCard with lightbox triggers & tech pills
│   │   │   └── sections/       # Hero, About, Experience, Projects, Skills, Certifications, Contact
│   │   ├── context/            # ThemeContext (dark/light), AuthContext (admin auth)
│   │   ├── data/               # fallbackData.js (instant render even before DB connects)
│   │   ├── hooks/              # useScrollSpy, useInView, useFetch
│   │   ├── pages/              # Home, AdminLogin, AdminDashboard, NotFound
│   │   └── styles/             # index.css (Tailwind directives, CSS variables, keyframes)
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── server/                     # Backend Express REST API
│   ├── config/                 # db.js (MongoDB Mongoose), cloudinary.js
│   ├── controllers/            # Profile, Experience, Project, Skill, Cert, Contact, Auth, Upload
│   ├── middleware/             # auth.js, errorHandler.js, validate.js, upload.js, rateLimiter.js
│   ├── models/                 # Profile, Experience, Project, Skill, Certification, Message, User
│   ├── routes/                 # Express route definitions
│   ├── seed/                   # seedData.js, seed.js (DB population script)
│   ├── utils/                  # sendEmail.js (Nodemailer transporter)
│   ├── server.js               # Main Express entrypoint
│   └── package.json
├── .env.example                # Unified environment variable documentation
├── README.md                   # Full documentation & deployment guide
└── package.json                # Monorepo root scripts
```

---

## 🚀 Quickstart & Local Setup

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v22.17.0)
- **npm** v9+
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URI.

### 2. Installation
Clone the repository and install all dependencies:
```bash
# Install root, server, and client dependencies
npm run install:all
```
*(Or run `npm install` inside root, `server/`, and `client/` manually).*

### 3. Environment Variables Setup
Copy the example files:
```bash
# Server configuration
cp server/.env.example server/.env

# Client configuration
cp client/.env.example client/.env
```

Review and adjust variables in `server/.env`:
```ini
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=super_secret_jwt_key_portfolio_2026_dev_secure
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173

ADMIN_EMAIL=admin@portfolio.dev
ADMIN_PASSWORD=Admin@12345

# Optional SMTP setup for real email forwarding:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
MAIL_TO=your_email@gmail.com

# Optional Cloudinary image storage:
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 4. Seed Database Content
Run the automated seed script to populate initial projects, profile details, experiences, skills, certifications, and create the admin user:
```bash
npm run seed
```

### 5. Start Development Servers
Run both backend API (`http://localhost:5000`) and frontend Vite client (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

Visit **http://localhost:5173** in your browser.

---

## ✏️ Replacing my content

You can swap all personal content in **one single file** on the frontend:
📂 `client/src/data/fallbackData.js`

Every section on the site reads dynamically from this object (with nothing hardcoded in component files):

| Field / Section | Property in `fallbackData.js` | What it Controls |
| :--- | :--- | :--- |
| **Name & Initials** | `profile.name`, `profile.initials` | Hero title, Navbar logo `<AK />`, Footer copyright, SEO schema |
| **Headline & Tagline** | `profile.headline`, `profile.tagline` | Hero value line, role subtitle, meta descriptions |
| **Status Pill** | `profile.statusBadge` | Top pill badge in Hero (e.g. "B.Tech CSE Finalist \| Open to Opportunities") |
| **Typing Effect Roles** | `profile.typingRoles` | Array of rotating strings displayed in Hero with typing cursor |
| **Contact Row** | `profile.email`, `profile.phone`, `profile.showPhone`, `profile.location` | Hero quick-row, Contact cards, mailto link, clipboard copy |
| **Avatar & Resume** | `profile.photoUrl`, `profile.resumeUrl` | Hero circular image (put image in `client/public/images/`) and resume file (`client/public/resume.pdf`) |
| **Biography** | `profile.aboutParagraphs`, `profile.highlightPhrases` | About section narrative and phrases highlighted with gradient text |
| **Education** | `profile.education` | Institution name, degree, year range, and CGPA star badge |
| **Stats Row** | `profile.stats` | Numeric counts for Projects, Certifications, Internships (animated count-up) |
| **Social Links** | `profile.socials` | GitHub, LinkedIn, Portfolio URLs in Hero, Contact, and Footer |
| **SEO & Meta** | `profile.seo` | Page `<title>`, Open Graph image, Twitter card, description |
| **Work Experience** | `experiences` | Company, role, partner, type pill, date range, current dot, arrow bullets |
| **Projects** | `projects` | Title, category filter, description, highlights, tech tags, GitHub/Live links, screenshot, badge |
| **Skills Grid** | `skills` | 4 category cards, skill titles, and icon keys |
| **Certifications** | `certifications` | Title, issuer, type (*certification / internship / achievement*), credential link |

> **Note on MongoDB Seed:** If you want your database to also store these exact details for the `/admin` CMS, mirror your changes in `server/seed/seedData.js` and run `npm run seed`.

---

## 🔐 Admin Panel Access

1. Navigate to: `http://localhost:5173/admin/login`
2. Default Seed Credentials:
   - **Email:** `admin@portfolio.dev`
   - **Password:** `Admin@12345`
3. You will be redirected to the `/admin` dashboard where you can:
   - Add, edit, or delete **Projects**, toggle the `featured` badge, upload screenshots, or reorder entries.
   - Update **Work Experience** bullets and dates.
   - Manage **Skills** and categories.
   - Manage **Certifications** and external credential links.
   - Review incoming **Messages** sent via the Contact form with read/unread statuses.
   - Edit your **Profile** copy, bio, and contact information.

---

## 📬 Contact Form & Spam Protection
- **Rate Limiting:** IP-based limitation strictly capping messages to 5 requests per hour.
- **Honeypot Trap:** Hidden field (`_honeypot`) that traps automated spambots and silently rejects spam without disturbing real users.
- **Nodemailer Integration:** Sends an email notification whenever someone fills the contact form, with safe simulation logging if SMTP credentials are left empty during local testing.

---

## 🌐 Production Deployment Guide

### Database: MongoDB Atlas
1. Create a free M0 cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Under "Network Access", add `0.0.0.0/0` (or your host IP).
3. Under "Database Access", create a database user and password.
4. Copy your connection string:
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority`

### Backend: Render or Railway
1. **Render:**
   - Create a new **Web Service** linked to your GitHub repo.
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - Add Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, etc.).
2. **Railway:**
   - New Project -> Deploy from GitHub repo -> select the `server` directory.
   - Set the variables in the Railway dashboard.

### Frontend: Vercel or Netlify
1. **Vercel:**
   - Import your repository.
   - **Root Directory:** `client`
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - Add Environment Variable:
     `VITE_API_URL=https://your-render-api.onrender.com/api`
2. **Custom Domain:**
   - In Vercel or Netlify, go to Settings -> Domains -> Add your domain (e.g., `arjun.dev`).
   - Configure DNS `CNAME` or `A` records as indicated by Vercel/Netlify.
   - Update `CLIENT_URL` in your backend environment variables to match your custom domain.

---

## 🛡️ Security Features
- **Password Security:** Salted hashes generated with `bcryptjs` (cost factor 10).
- **Session Security:** JWT token generation with expiration limits, httpOnly cookies with `secure` and `sameSite` flags.
- **Header Protection:** `helmet` enabled to prevent XSS, clickjacking, and MIME-type sniffing.
- **Input Sanitization:** Parameter validation and type checking via `express-validator`.
- **DDoS Mitigation:** `express-rate-limit` active on API routes.

