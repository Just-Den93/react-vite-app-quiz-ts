import React from 'react';
import { FaBars } from 'react-icons/fa';
import styles from './Sidebar.module.scss';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className={styles.sidebar}>
      <button className={styles.tab}>
        <FaBars className={styles.icon} />
        <span className={styles.tabText}>Бібліотека</span>
      </button>
    </div>
  );
};

export default Sidebar;
