import styles from './Table.module.css';

const table = () => {
  const stats = [
    {
      date: '2000-01-01T01:00:00.000Z',
      impressions: '888888',
      clicks: '3000',
      revenue: '12345.1234590000000',
    },
    {
      date: '2000-01-02T01:00:00.000Z',
      impressions: '888888',
      clicks: '3000',
      revenue: '6000.3479640000000',
    },
    {
      date: '2000-01-03T01:00:00.000Z',
      impressions: '888888',
      clicks: '3000',
      revenue: '5000.9616000000000',
    },
    {
      date: '2000-01-04T01:00:00.000Z',
      impressions: '888888',
      clicks: '3000',
      revenue: '5000.9616000000000',
    },
    {
      date: '2000-01-05T01:00:00.000Z',
      impressions: '888888',
      clicks: '3000',
      revenue: '3000.9616000000000',
    },
    {
      date: '2000-01-06T01:00:00.000Z',
      impressions: '888888',
      clicks: '3000',
      revenue: '2000.9616000000000',
    },
    {
      date: '2000-01-07T01:00:00.000Z',
      impressions: '888888',
      clicks: '3000',
      revenue: '1000.9616000000000',
    },
  ];
  return (
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
          <tr className={styles.row} key={stat}>
            <td>{stat.date}</td>
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
