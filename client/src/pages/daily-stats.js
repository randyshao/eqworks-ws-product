import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import StackedChart from '../components/StackedChart';
import SearchBar from '../components/SearchBar';

const DailyStats = ({ stats }) => {
  const allKeys = ['impressions', 'clicks', 'revenue'];

  const colors = {
    impressions: 'darkturquoise',
    clicks: 'magenta',
    revenue: 'orange',
  };

  const [keys, setKeys] = useState(allKeys);
  const [name, setName] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  // searchbox filtering
  useEffect(() => {
    const results = stats.filter(
      (stat) =>
        stat.impressions.toString().includes(name) +
        stat.clicks.toString().includes(name) +
        stat.revenue.toString().includes(name) +
        stat.date.slice(0, 10).includes(name)
    );
    setFilteredList(results);
  }, [name]);

  return (
    <Layout>
      <h2 className={styles.Title}>
        # of Impressions vs. Clicks vs. Revenue (Daily)
      </h2>
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

      <h2 className={styles.Title}>Table Data</h2>

      <SearchBar
        placeholder='Search statistics...'
        getQuery={(q) => setName(q)}
      />

      <table className={styles.DailyStats}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Impressions</th>
            <th>Clicks</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((stat, index) => (
            <tr className={styles.row} key={index}>
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
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/stats/daily');
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
