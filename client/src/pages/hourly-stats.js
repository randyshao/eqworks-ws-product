import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout/Layout';

const HourlyStats = ({ stats }) => {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className={styles.title}>Event Charts</h1>
      <h2 className={styles.title}>Database Tables</h2>

      <table className={styles.HourlyStats}>
        <thead>
          <tr className={styles.headers}>
            <th>Date</th>
            <th>Hour</th>
            <th>Impressions</th>
            <th>Clicks</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => (
            <tr className={styles.row} key={stat.impressions}>
              <td>{stat.date}</td>
              <td>{stat.hour}</td>
              <td>{stat.impressions}</td>
              <td>{stat.clicks}</td>
              <td>{stat.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default HourlyStats;

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:5555/stats/hourly');
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
