import styles from './Table.module.css';

const table = () => {
  const stats = [
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 0,
      impressions: '888888',
      clicks: '3000',
      revenue: '12345.1234590000000',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 1,
      impressions: '888888',
      clicks: '3000',
      revenue: '12345.1234590000000',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 1,
      impressions: '888888',
      clicks: '3000',
      revenue: '12345.1234590000000',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 1,
      impressions: '888888',
      clicks: '3000',
      revenue: '12345.1234590000000',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 1,
      impressions: '888888',
      clicks: '3000',
      revenue: '12345.1234590000000',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 1,
      impressions: '888888',
      clicks: '3000',
      revenue: '12345.1234590000000',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 1,
      impressions: '888888',
      clicks: '3000',
      revenue: '12345.1234590000000',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 1,
      impressions: '888888',
      clicks: '3000',
      revenue: '12345.1234590000000',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 1,
      impressions: '888888',
      clicks: '3000',
      revenue: '12345.1234590000000',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 1,
      impressions: '888888',
      clicks: '3000',
      revenue: '12345.1234590000000',
    },
    {
      date: '2000-01-01T01:00:00.000Z',
      hour: 1,
      impressions: '888888',
      clicks: '3000',
      revenue: '12345.1234590000000',
    },
  ];
  return (
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
          <tr className={styles.row} key={stat}>
            <td>{stat.date}</td>
            <td>{stat.hour}</td>
            <td>{stat.impressions}</td>
            <td>{stat.clicks}</td>
            <td>{stat.revenue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default table;
