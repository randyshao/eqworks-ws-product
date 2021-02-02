import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <main>
        <div>
          <h2 className={styles.Title} style={{ textAlign: 'center' }}>
            Welcome to EQ Works!
          </h2>
        </div>
      </main>
    </Layout>
  );
}
