import React from 'react';
import styles from './Badge.module.css';

export default function Badge({ type, text }) {
  const getStyle = () => {
    switch (type.toLowerCase()) {
      case 'high': return styles.high;
      case 'medium': return styles.medium;
      case 'low': return styles.low;
      case 'pending': return styles.pending;
      case 'assigned': return styles.assigned;
      case 'in transit': return styles.intransit;
      case 'delivered': return styles.delivered;
      default: return styles.pending;
    }
  };

  return (
    <span className={`${styles.badge} ${getStyle()}`}>
      {text || type}
    </span>
  );
}
