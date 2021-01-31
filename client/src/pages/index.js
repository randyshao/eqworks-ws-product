import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Event Charts</h1>
        <div>
          <h2 className={styles.title}>Welcome to EQ Works!</h2>
        </div>
      </main>
    </Layout>
  );
}
