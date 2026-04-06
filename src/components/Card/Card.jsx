import React from 'react';
import styles from './Card.module.css';

export default function Card({ title, icon, children, className = '' }) {
  return (
    <div className={`${styles.card} ${className}`}>
      {title && (
        <div className={styles.title}>
          <span>{title}</span>
          {icon && <span className={styles.icon}>{icon}</span>}
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
