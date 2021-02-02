import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Layout.module.css';
import Navbar from './Navbar';
import SideDrawer from './SideDrawer';

const Layout = ({ children }) => {
  return (
    <div className={styles.Container}>
      <Head>
        <title>EQ Works</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <SideDrawer />
      {children}
      <footer>
        Powered by{' '}
        <Link href='https://www.eqworks.com/'>
          <a style={{ color: '#248CCA' }}>EQ Works</a>
        </Link>
      </footer>
    </div>
  );
};

export default Layout;
