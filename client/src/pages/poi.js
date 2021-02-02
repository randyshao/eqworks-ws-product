import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';

const DailyEvents = ({ stats }) => {
  const [name, setName] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    // searchbox filtering
    const results = stats.filter(
      (stat) =>
        stat.name.includes(name) +
        stat.name.toLowerCase().includes(name) +
        stat.name.toUpperCase().includes(name) +
        stat.lon.toString().includes(name) +
        stat.lat.toString().includes(name)
    );
    setFilteredList(results);
  }, [name]);

  return (
    <Layout>
      <Map stats={stats} />

      <SearchBar
        placeholder='Search statistics...'
        getQuery={(q) => setName(q)}
      />

      <table className={styles.HourlyEvents}>
        <thead>
          <tr>
            <th>Location</th>
            <th>Longitude</th>
            <th>Latitude</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((stat) => (
            <tr className={styles.row} key={stat.poi_id}>
              <td>{stat.name}</td>
              <td>{stat.lon}</td>
              <td>{stat.lat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default DailyEvents;

export const getStaticProps = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/poi');
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
