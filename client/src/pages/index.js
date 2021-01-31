import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout/Layout';
import Tables from '../components/Table/Tables';

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
          <h2 className={styles.title}>Database Tables</h2>
          <Tables />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by Randy Shao
        </a>
      </footer>
    </Layout>
  );
}
