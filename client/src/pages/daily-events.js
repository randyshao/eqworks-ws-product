import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import StackedChart from '../components/StackedChart';
import SearchBar from '../components/SearchBar';

const DailyEvents = ({ stats }) => {
  const allKeys = ['events'];

  const colors = {
    events: 'darkturquoise',
  };

  const [keys, setKeys] = useState(allKeys);
  const [name, setName] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  // searchbox filtering
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
      <h2 className={styles.Title}># of Events (Daily)</h2>
      <StackedChart stats={stats} keys={keys} colors={colors} />

      <h2 className={styles.Title}>Table Data</h2>

      <SearchBar
        placeholder='Search statistics...'
        getQuery={(q) => setName(q)}
      />

      <table className={styles.DailyEvents}>
        <thead>
          <tr>
            <th>Date</th>
            <th># of Events</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((stat, index) => (
            <tr className={styles.row} key={index}>
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
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + '/events/daily'
  );
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
