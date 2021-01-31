import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
      <footer className={styles.footer}>Powered by Randy Shao</footer>
    </div>
  );
};

export default Layout;
