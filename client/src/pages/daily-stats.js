import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout/Layout';
import StackedChart from '../components/Chart/StackedChart';

const DailyStats = ({ stats }) => {
  const allKeys = ['impressions', 'clicks', 'revenue'];

  const colors = {
    impressions: 'darkturquoise',
    clicks: 'magenta',
    revenue: 'orange',
  };

  const [keys, setKeys] = useState(allKeys);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className={styles.title}>Event Charts</h1>
      <h2 className={styles.title}># of Impressions vs. Clicks vs. Revenue</h2>

      <StackedChart stats={stats} keys={keys} colors={colors} />

      <div className='fields'>
        {allKeys.map((key) => (
          <div key={key} className='field'>
            <input
              id={key}
              type='checkbox'
              checked={keys.includes(key)}
              onChange={(e) => {
                if (e.target.checked) {
                  setKeys(Array.from(new Set([...keys, key])));
                } else {
                  setKeys(keys.filter((_key) => _key !== key));
                }
              }}
            />
            <label htmlFor={key} style={{ color: colors[key] }}>
              {key}
            </label>
          </div>
        ))}
      </div>

      <h2 className={styles.title}>Database Tables</h2>

      <table className={styles.DailyStats}>
        <thead>
          <tr className={styles.headers}>
            <th>Date</th>
            <th>Impressions</th>
            <th>Clicks</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => (
            <tr className={styles.row} key={stat.impressions}>
              <td>{stat.date.slice(0, 10)}</td>
              <td>{stat.impressions}</td>
              <td>{stat.clicks}</td>
              <td>{parseFloat(stat.revenue).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default DailyStats;

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:5555/stats/daily');
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
