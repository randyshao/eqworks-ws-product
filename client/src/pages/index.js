import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <main>
        <div>
          <h2 className={styles.Title} style={{ textAlign: 'center' }}>
            Welcome to EQ Works! 😎
          </h2>
          <div className={styles.Previews}>
            <Link href='/daily-stats'>
              <div className={styles.PreviewImage}>
                <img src='daily-stats.png' />
                <div className={styles.Overlay}>
                  <p>Daily Stats</p>
                </div>
              </div>
            </Link>
            <Link href='/daily-events'>
              <div className={styles.PreviewImage}>
                <img src='daily-events.png' />
                <div className={styles.Overlay}>
                  <p>Daily Events</p>
                </div>
              </div>
            </Link>
            <Link href='/hourly-stats'>
              <div className={styles.PreviewImage}>
                <img src='hourly-stats.png' />
                <div className={styles.Overlay}>
                  <p>Hourly Stats</p>
                </div>
              </div>
            </Link>
            <Link href='/hourly-events'>
              <div className={styles.PreviewImage}>
                <img src='hourly-events.png' />
                <div className={styles.Overlay}>
                  <p>Hourly Events</p>
                </div>
              </div>
            </Link>
            <Link href='/poi'>
              <div className={styles.PreviewImage}>
                <img src='poi.png' />
                <div className={styles.Overlay}>
                  <p>Points of Interest</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
