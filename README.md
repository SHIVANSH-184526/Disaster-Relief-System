# Sahayta Connect Dashboard

A React + Vite application for Disaster Relief Coordination. Features robust mock-data rendering for emergency requests, inventory management, supply allocation, and analytics.

---

## 🚀 Running on Another Laptop

If you copy these project files to another laptop (or clone them via Git), you do not need to re-initialize the app. Just run these two commands in the terminal within the project directory:

### 1. Install Required Dependencies
```bash
npm install
```
*(This will read the `package.json` and automatically install React, Recharts, React-Router-DOM, and Lucide-React.)*

### 2. Start the Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

---

## 🛠️ Complete Project Setup History (For Reference)

If you ever want to rebuild this exact structured environment completely from scratch on a blank slate, here are the exact commands I ran during development:

**1. Initialize the Vite React Template**
```bash
npx create-vite@latest crisisnet-dashboard --template react
cd crisisnet-dashboard
```

**2. Install Core Dashboard Libraries**
```bash
# react-router-dom: for page navigation
# recharts: for analytics and SVG graphs
# lucide-react: for standardized crisp icons
npm install react-router-dom recharts lucide-react
```

**3. Build for Production** (Validation check)
```bash
npm run build
```

--- 

## Core Features Implemented
* **Requests Module**: Stateful form to add and track people in need.
* **Supply Depot**: Add local/NGO inventory levels safely.
* **Allocation Matcher**: Match an unassigned request with localized resources and dispatch them.
* **Tracker & Analytics**: View dynamically updating charts and filterable lists showing the lifecycle of relief dispatching.
