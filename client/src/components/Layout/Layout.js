import styles from './Layout.module.css';
import Navbar from '../Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      {children}
      <footer className={styles.footer}>Powered by Randy Shao</footer>
    </div>
  );
};

export default Layout;
