import styles from './Table.module.css';

const headers = { User: 'Randy' };

const fetcher = async (path) => {
  const res = await fetch(path);
  return res.json;
};

const table = ({ events }) => {
  const stats = [
    {
      date: '2000-01-01T01:00:00.000Z',
      events: '10',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      events: '11',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      events: '12',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      events: '13',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      events: '14',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      events: '15',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      events: '16',
    },
  ];
  return (
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
  );
};

export default table;
