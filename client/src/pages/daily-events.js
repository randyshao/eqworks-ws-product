import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout/Layout';
import StackedChart from '../components/Chart/StackedChart';
import SearchBar from '../components/SearchBar/SearchBar';

const DailyEvents = ({ stats }) => {
  const allKeys = ['events'];

  const colors = {
    events: 'darkturquoise',
  };

  const [keys, setKeys] = useState(allKeys);
  const [name, setName] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const results = stats.filter(
      (stat) =>
        stat.events.toString().includes(name) +
        stat.date.slice(0, 10).includes(name)
    );
    setFilteredList(results);
  }, [name]);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className={styles.title}>Event Charts</h1>
      <h2 className={styles.title}># of Events</h2>

      <StackedChart stats={stats} keys={keys} colors={colors} />

      <h2 className={styles.title}>Database Tables</h2>

      <SearchBar
        placeholder='Search statistics...'
        getQuery={(q) => setName(q)}
      />

      <table className={styles.DailyEvents}>
        <thead>
          <tr className={styles.headers}>
            <th>Date</th>
            <th># of Events</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((stat) => (
            <tr className={styles.row} key={stat.events}>
              <td>{stat.date.slice(0, 10)}</td>
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
