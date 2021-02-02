import styles from '../styles/Navbar.module.css';
import Link from 'next/link';

const SideDrawer = ({ open }) => {
  let attachedClasses = 'Close';

  if (open) {
    attachedClasses = 'Open';
  }

  return (
    <div className={attachedClasses}>
      <nav className={styles.SideDrawer}>
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
  );
};

export default SideDrawer;
