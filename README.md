# Gulf Consult Enterprise Resource Planning (GC_ERP)

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-Email_API-000000?style=for-the-badge&logo=resend&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
[![CI/CD Pipeline](https://github.com/GoondlaBalaji/GulfConsult_ERP/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/GoondlaBalaji/GulfConsult_ERP/actions/workflows/ci-cd.yml)
[![Live Demo](https://img.shields.io/badge/Live_Demo-gulfconsulterp--frontend.vercel.app-00C7B7?style=for-the-badge&logo=vercel&logoColor=white)](https://gulfconsulterp-frontend.vercel.app)

A full-stack, enterprise-grade Enterprise Resource Planning (ERP) suite engineered for **Gulf Consult Engineering & Planning**. The platform unifies Human Resource Management (HRMS), Time Sheet Management (TSMS), Automated Payroll Processing, and Role-Based Access Control (RBAC) backed by MySQL and third-party email verification via Resend.

🌐 **Live Application:** [https://gulfconsulterp-frontend.vercel.app](https://gulfconsulterp-frontend.vercel.app)

---

## 🏛 System Architecture & Modules

```
┌────────────────────────────────────────────────────────────────────────┐
│                        GC-ERP React 18 Frontend                        │
│             (Vite + Tailwind CSS + Lucide Icons + GSAP)                │
└───────────────────▲────────────────────────────────▲───────────────────┘
                    │                                │
            REST API (JSON / JWT)            Static Assets / Routing
                    │                                │
┌───────────────────▼──────────────────────┐         │
│         Node.js Express Backend          │         │
│  (Port 5000 / JWT Auth / Role Middleware)│         │
└───────▲──────────────────────────▲───────┘         │
        │                          │                 │
  MySQL Connection          Resend Cloud API         │
  (mysql2 / Pool)           (Real Email OTP)         │
        │                          │                 │
┌───────▼───────────┐      ┌───────▼───────────┐ ┌───▼──────────────────┐
│   MySQL 8.0 DB    │      │  User Gmail Inbox │ │  Vercel / Local Host │
│ (18 Core Tables)  │      │ (6-Digit OTP Code)│ │  (SPA Distribution)  │
└───────────────────┘      └───────────────────┘ └──────────────────────┘
```

### 1. Human Resource Management System (HRMS)
- **Employee Directory**: Complete records for 45+ GCC engineering and administrative personnel with designations, departments, joined dates, and statuses.
- **Onboarding & New Joiners**: Structured registration workflows, document verification, and credential assignment.
- **Job Openings**: Real-time vacancy management across architectural, civil, BIM, mechanical, and QS departments.
- **Document Repository**: Document tracking for Civil IDs, Passports, Residency Visas, and PACI cards.

### 2. Time Sheet Management System (TSMS)
- **Projects Registry**: Master tracking for Kuwait commercial towers, coastal highways, and medical infrastructure projects.
- **Timesheets & Billable Hours**: Daily tracking, time distribution, and approval chains.
- **Task Tracking**: Task milestone logs, billable vs. non-billable hours breakdown.

### 3. Payroll & Compensation Engine
- **Salary Computation**: Basic pay, gross salary, and net compensation records.
- **Allowances & Deductions**: Housing, transport, mobile, site hardship allowances, social security, and leave deductions.
- **Payslip Summaries**: Monthly payroll auditing and reporting for October 2026.

### 4. Enterprise Security & Role-Based Access Control (RBAC)
- **Separate Tables**: Follows SAP/Oracle standard where `Gen_Employee` holds personnel data and `Sec_Users` holds authenticated credentials.
- **Dynamic UI Adaptation**: Sidebar navigation and route guards (`RoleProtectedRoute`) dynamically hide unauthorized modules.
- **Third-Party Email Verification**: Real 6-digit OTP delivery directly to user email via **Resend Cloud API**.

---

## 🔐 Access Control Matrix

| Role | Username | Password | Permitted Modules & Access Scope |
| :--- | :--- | :--- | :--- |
| **System Administrator** | `admin` | `admin123` | **Full Unrestricted Access** across all modules, including Security User Accounts (`/users`) |
| **HR Manager** | `hr_manager` | `hr123` | HRMS Directory, Job Openings, New Joiners, Payroll, Allowances & Deductions |
| **Project Manager** | `pm_expert` | `pm123` | Projects, Timesheets (TSMS), Time Tracking *(Payroll & Admin modules hidden)* |

---

## 📂 Repository Structure

```text
GulfConsult_ERP/
├── backend/                        # Node.js + Express REST API Server
│   ├── config/                     # Database connection pool (mysql2)
│   ├── controllers/                # Auth, employee, payroll, and project controllers
│   ├── middleware/                 # JWT token verification & requireRole middleware
│   ├── routes/                     # API endpoint definitions
│   ├── scripts/                    # initDb.js and seed40.js automation scripts
│   ├── services/                   # Resend API and Nodemailer email dispatch
│   ├── server.js                   # Server entry point (Port 5000)
│   └── package.json                # Backend dependencies
├── ERP project/
│   └── gc-erp/
│       └── frontend/               # React 18 + Vite Single Page Application
│           ├── src/
│           │   ├── components/     # Layout, Sidebar, Navbar, PageHeader, UI elements
│           │   ├── context/        # AuthContext with role normalization & token persistence
│           │   ├── pages/          # Dashboard, Employees, Payroll, Users, Timesheets, etc.
│           │   └── services/       # API client with auto-detecting endpoints
│           ├── public/             # Branding assets, logo, favicons
│           ├── vercel.json         # SPA client routing rewrites
│           └── package.json        # Frontend dependencies
├── SQL Scripts/                    # Complete production MySQL schemas & seed data
│   ├── HRMS.sql                    # HR tables, companies, job titles, nationalities, employees
│   ├── TSMS.sql                    # Projects, timesheets, and activity tracking
│   ├── Payroll.sql                 # Salary master, allowances, and deductions
│   ├── Seed_Data.sql               # Core master lookup data
│   └── Seed_40_Employees.sql       # 40+ GCC employee dataset, logins, and payroll
├── .github/workflows/              # Automated CI/CD pipelines
├── .gitignore                      # Git ignore rules for node_modules, logs, and .env
└── README.md                       # Master enterprise documentation
```

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MySQL Server 8.0+](https://dev.mysql.com/downloads/mysql/) running locally (e.g. `MYSQL80` Windows service)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/GoondlaBalaji/GulfConsult_ERP.git
cd GulfConsult_ERP
```

### 2. Configure Backend Environment
Create `backend/.env` (see `backend/.env.example`):
```env
PORT=5000
NODE_ENV=development

# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=GC_ERP

# Resend API for Real Email OTP Delivery
RESEND_API_KEY=re_your_api_key_from_resend_com

# JWT Authentication
JWT_SECRET=gc_erp_super_secret_jwt_key_2026_balaji
JWT_EXPIRES_IN=7d

# CORS Allowed Origins
CLIENT_URL=http://localhost:3000,https://gulfconsulterp-frontend.vercel.app
```

### 3. Initialize & Seed Database
Run the automated schema and dataset installer:
```bash
cd backend
npm install
npm run init-db     # Creates GC_ERP database and all 18 tables
npm run seed-40     # Populates 45 employees, 20 users, and 21 payroll records
```

### 4. Start the Application
**Terminal 1 (Backend API):**
```bash
cd backend
npm start
# API starts on http://localhost:5000 (Health check: http://localhost:5000/api/health)
```

**Terminal 2 (Frontend Client):**
```bash
cd "ERP project/gc-erp/frontend"
npm install
npm run dev
# Web application starts on http://localhost:3000
```

---

## ✉️ Real Email Verification with Resend

The registration module delivers verification codes to real inboxes using **[Resend](https://resend.com)**:

1. Obtain a free API key from [resend.com](https://resend.com) (`re_...`).
2. Add `RESEND_API_KEY=re_...` to `backend/.env`.
3. Open `http://localhost:3000/login` → Click **Sign Up**.
4. Enter your email and click **Send Code**.
5. Check your email inbox (or spam folder), retrieve the 6-digit code, and submit registration.

---

## ☁️ Deployment

### Frontend (Vercel)
1. Import repository on [Vercel](https://vercel.com/new).
2. Set **Root Directory** to `ERP project/gc-erp/frontend`.
3. Set **Framework Preset** to `Vite`.
4. Deploy.

### Backend (Render / Railway / VPS)
1. Create a Web Service pointing to the `backend/` directory.
2. Build command: `npm install`.
3. Start command: `npm start`.
4. Set environment variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `RESEND_API_KEY`, `JWT_SECRET`).

---

## 🔄 CI / CD Pipeline

The repository includes automated GitHub Actions (`.github/workflows/ci-cd.yml`):
- **Continuous Integration**: Validates all SQL schemas, runs dependency checks, and verifies production Vite builds on Ubuntu.
- **Continuous Deployment**: Builds and validates release artifacts upon every push to `main`.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 5, Tailwind CSS, Lucide Icons, GSAP, WebGL Canvas |
| **Backend** | Node.js, Express 4, JWT (`jsonwebtoken`), `bcryptjs`, CORS |
| **Database** | MySQL 8.0, `mysql2` Connection Pool with SSL support |
| **Email API** | Resend Cloud API (`resend`), Nodemailer |
| **DevOps** | GitHub Actions, Vercel, Render |

---

## 👨‍💻 Author
- **Goondla Balaji**
- **GitHub:** [@GoondlaBalaji](https://github.com/GoondlaBalaji)
- **Repository:** [GulfConsult_ERP](https://github.com/GoondlaBalaji/GulfConsult_ERP)
