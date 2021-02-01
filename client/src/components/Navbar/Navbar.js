import styles from './Navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className={styles.NavBar}>
      <div className={styles.Container}>
        <li>
          <Link href='/'>
            <span className={styles.Logo}>
              <img src='logo.png' />
            </span>
          </Link>
        </li>
        <nav className={styles.NavItems}>
          <li>
            <Link href='/daily-stats'>
              <a>Daily Stats</a>
            </Link>
          </li>
          <li>
            <Link href='/daily-events'>
              <a>Daily Events</a>
            </Link>
          </li>
          <li>
            <Link href='/hourly-stats'>
              <a>Hourly Stats</a>
            </Link>
          </li>
          <li>
            <Link href='/hourly-events'>
              <a>Hourly Events</a>
            </Link>
          </li>
          <li>
            <Link href='/poi'>
              <a>Map</a>
            </Link>
          </li>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
