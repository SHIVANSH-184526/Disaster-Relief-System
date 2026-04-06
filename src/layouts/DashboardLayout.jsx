import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  PackageSearch, 
  Network, 
  MapPin, 
  BarChart3, 
  FileText,
  Search,
  Bell,
  LogOut,
  ShieldAlert
} from 'lucide-react';
import styles from './DashboardLayout.module.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { path: '/requests', label: 'Requests', icon: <ClipboardList size={20} /> },
  { path: '/supplies', label: 'Supply Management', icon: <PackageSearch size={20} /> },
  { path: '/allocation', label: 'Allocation', icon: <Network size={20} /> },
  { path: '/tracking', label: 'Tracking', icon: <MapPin size={20} /> },
  { path: '/analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  { path: '/reports', label: 'Reports', icon: <FileText size={20} /> },
];

export default function DashboardLayout() {
  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <ShieldAlert className={styles.logoIcon} size={28} />
          <span>Sahayta Connect</span>
        </div>
        
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path}
              className={({ isActive }) => 
                isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Top Header */}
        <header className={styles.header}>
          <div className={styles.searchBar}>
            <Search size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search IDs, locations, items..." 
              className={styles.searchInput}
            />
          </div>

          <div className={styles.headerActions}>
            <button className={styles.iconButton}>
              <Bell size={20} />
            </button>
            
            <div className={styles.userInfo}>
              <div className={styles.avatar}>A</div>
              <div className={styles.userDetails}>
                <span className={styles.userName}>Admin User</span>
                <span className={styles.userRole}>System Admin</span>
              </div>
            </div>

            <button className={styles.iconButton} title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className={styles.contentArea}>
          <div className={styles.bgOrnament}></div>
          <Outlet /> {/* This renders the inner pages */}
        </div>
      </main>
    </div>
  );
}
