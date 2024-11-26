import React from 'react';
import styles from './Settings.module.scss';

function Settings({ onClose }) {
  return (
    <div className={styles.settings}>
      <div className={styles.sidebar}>
        <button className={styles.tab}>
          <span className={styles.tabText}>Тема</span>
        </button>
        <button className={styles.tab}>
          <span className={styles.tabText}>Параметри</span>
        </button>
      </div>
      <button className={styles.closeButton} onClick={onClose}>Close</button>
    </div>
  );
}

export default Settings;
