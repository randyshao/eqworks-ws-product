import styles from './Table.module.css';

const table = () => {
  const stats = [
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 1,
      events: 10,
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 2,
      events: 10,
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 5,
      events: 10,
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 6,
      events: 10,
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 12,
      events: 10,
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 14,
      events: 10,
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 13,
      events: 10,
    },
  ];

  return (
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
            <td>{stat.date}</td>
            <td>{stat.hour}</td>
            <td>{stat.events}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default table;
