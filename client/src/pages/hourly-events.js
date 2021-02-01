import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout/Layout';

const HourlyEvents = ({ stats }) => {
  const [startDate, setStartDate] = useState(null);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className={styles.title}>Event Charts</h1>
      <h2 className={styles.title}>Database Tables</h2>

      <table className={styles.HourlyEvents}>
        <thead>
          <tr className={styles.headers}>
            <th>Date</th>
            <th>Hour</th>
            <th># of Events</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => (
            <tr className={styles.row} key={stat}>
              <td>{stat.date.slice(0, 10)}</td>
              <td>{stat.hour}</td>
              <td>{stat.events}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default HourlyEvents;

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:5555/events/hourly');
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
