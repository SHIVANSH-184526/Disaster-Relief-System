import React from 'react';
import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', icon, onClick, className = '', type = 'button' }) {
  const getVariantStyle = () => {
    switch(variant) {
      case 'secondary': return styles.secondary;
      case 'danger': return styles.danger;
      default: return styles.primary;
    }
  };

  return (
    <button type={type} className={`${styles.btn} ${getVariantStyle()} ${className}`} onClick={onClick}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}
