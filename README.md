# Gulf Consult Enterprise Resource Planning (GC_ERP)

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
[![CI/CD Pipeline](https://github.com/GoondlaBalaji/GulfConsult_ERP/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/GoondlaBalaji/GulfConsult_ERP/actions/workflows/ci-cd.yml)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A modern, high-performance web-based Enterprise Resource Planning (ERP) suite engineered for **Gulf Consult**. The system unifies Human Resource Management (HRMS), Time Sheet Management (TSMS), and Automated Payroll into a cohesive, secure, and intuitive digital workspace.

---

## 🏛 System Modules

### 1. Human Resource Management System (HRMS)
- **Employee Directory**: Centralized management of staff profiles, employment status, job codes, and departments.
- **Onboarding & New Joiners**: Structured workflows for document collection, approvals, and credential generation.
- **Talent Acquisition**: Job openings tracker, applicant stages, and position allocation.
- **Document Vault**: Secure record-keeping for civil IDs, passports, academic records, and residency papers.

### 2. Time Sheet Management System (TSMS)
- **Project Tracking**: Master registry of architectural, engineering, and consulting projects.
- **Resource Allocation**: Task assignments, supervisor approvals, and milestone timelines.
- **Timesheets & Logs**: Daily clock-in/clock-out, billable hours tracking, and periodic attendance reports.

### 3. Payroll & Compensation
- **Salary Computation**: Automated calculation of base pay, overtime, and allowances (housing, transport, mobile).
- **Deductions & Benefits**: Social security, absences, advances, and penalty deductions.
- **Payslip Generation**: Instant payslip summaries and payroll auditing.

### 4. Security & Administration
- **Role-Based Access Control (RBAC)**: Fine-grained permissions for System Administrator, HR Manager, and Project Manager.
- **Two-Factor Authentication**: OTP verification workflow for protected actions and logins.
- **Modern User Experience**: Micro-animations, dark glassmorphism styling, and responsive layout.

---

## 📂 Repository Structure

```text
GulfConsult_ERP/
├── Babai_docs/                     # Architecture flowcharts & database entity diagrams
├── My_Docs/                        # Database reference sheets and functional specs
├── SQL Scripts/                    # Complete production MySQL schemas & seed data
│   ├── HRMS.sql                    # HR master tables, relations, and triggers
│   ├── TSMS.sql                    # Project master, client master, and timesheets
│   ├── Payroll.sql                 # Allowances, deductions, and salary tables
│   └── Seed_Data.sql               # Initial sample and lookup data
├── ERP project/
│   └── gc-erp/
│       ├── frontend/               # React + Vite Single Page Application
│       │   ├── src/
│       │   │   ├── components/     # Reusable UI elements (Navigation, Layout, Canvas)
│       │   │   ├── context/        # Global Auth & State Contexts
│       │   │   ├── pages/          # Dashboard, Employees, Payroll, Timesheets, etc.
│       │   │   └── services/       # Mock authentication & API services
│       │   ├── public/             # Static assets, branding, and icons
│       │   ├── vercel.json         # Vercel SPA routing rewrites
│       │   └── package.json        # Dependencies and scripts
└── README.md                       # Main documentation
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MySQL Server 8.0+](https://dev.mysql.com/downloads/mysql/) & [MySQL Workbench](https://www.mysql.com/products/workbench/)

### 1. Clone Repository
```bash
git clone https://github.com/GoondlaBalaji/GulfConsult_ERP.git
cd GulfConsult_ERP
```

### 2. Run the Frontend
```bash
cd "ERP project/gc-erp/frontend"
npm install
npm run dev
```

The application will run at **`http://localhost:3000`**.

---

## 🔐 Default Demo Credentials

For testing and local evaluation, default accounts with simulated OTP support are available:

| Role | Username | Password | Default OTP |
| :--- | :--- | :--- | :--- |
| **System Administrator** | `admin` | `admin123` | `123456` |
| **HR Manager** | `hr_manager` | `hr123` | `123456` |
| **Project Manager** | `pm_expert` | `pm123` | `123456` |

---

## 🗄️ Database Setup (MySQL)

All relational database scripts are available in the [`SQL Scripts`](./SQL%20Scripts) directory:

1. Open **MySQL Workbench** on your machine.
2. Connect to your local or cloud MySQL instance (`MYSQL80`).
3. Execute the scripts in the following order:
   - `SQL Scripts/HRMS.sql` (Creates company, job titles, education, employees)
   - `SQL Scripts/TSMS.sql` (Creates clients, projects, task allocations, timesheets)
   - `SQL Scripts/Payroll.sql` (Creates allowances, deductions, payroll processing)
   - `SQL Scripts/Seed_Data.sql` (Inserts initial seed records)

---

## ☁️ Deployment

### Deploy to Vercel (Recommended)
1. Fork or push this repository to your GitHub account: `https://github.com/GoondlaBalaji/GulfConsult_ERP`.
2. Open [Vercel Dashboard](https://vercel.com/new) and click **Import**.
3. Set **Root Directory** to:
   ```text
   ERP project/gc-erp/frontend
   ```
4. Framework preset will automatically be set to **Vite**.
5. Click **Deploy**.

*Production routing rewrites are pre-configured in `vercel.json`.*

## 🔄 CI / CD Pipeline

The repository includes an automated GitHub Actions workflow (`.github/workflows/ci-cd.yml`):

- **Continuous Integration (CI)**:
  - Triggers on every push & pull request to `main`.
  - Runs in a clean Ubuntu container using Node.js 20.x with package caching.
  - Automatically verifies dependency integrity with `npm ci`.
  - Validates SQL schema files in `SQL Scripts/` (`HRMS.sql`, `TSMS.sql`, `Payroll.sql`, `Seed_Data.sql`).
  - Executes production build verification (`npm run build`).
  - Stores production build artifacts for 7 days.
- **Continuous Deployment (CD)**:
  - Automatically deploys the production build to **GitHub Pages** upon every successful push to `main`.
  - Seamlessly integrates with **Vercel** / **Netlify** for instant production preview and production branches.

---

## 🛠️ Tech Stack & Libraries
- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Animations**: [GSAP](https://gsap.com/) & WebGL ([OGL](https://github.com/oframe/ogl))
- **Database**: [MySQL 8.0](https://www.mysql.com/)

---

## 👨‍💻 Author
- **Goondla Balaji**
- GitHub: [@GoondlaBalaji](https://github.com/GoondlaBalaji)
- Project: Gulf Consult ERP (GC_ERP)
