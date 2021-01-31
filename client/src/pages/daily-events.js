import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout/Layout';

const DailyEvents = ({ stats }) => {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className={styles.title}>Event Charts</h1>
      <h2 className={styles.title}>Database Tables</h2>

      <table className={styles.DailyEvents}>
        <thead>
          <tr className={styles.headers}>
            <th>Date</th>
            <th># of Events</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => (
            <tr className={styles.row} key={stat.events}>
              <td>{stat.date}</td>
              <td>{stat.events}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default DailyEvents;

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:5555/events/daily');
  const stats = await res.json();

  if (!stats) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      stats,
    },
  };
};
