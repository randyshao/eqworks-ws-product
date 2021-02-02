import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import useResizeObserver from '../hooks/useResizeObserver';
import {
  select,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
  area,
  scalePoint,
  curveCardinal,
} from 'd3';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HourlyStats = ({ stats }) => {
  // Returns stats object with correctly reformatted ISO 8601 date
  const newStats = stats.map((stat) => {
    const chars = stat.date.split('');
    chars[12] = '5';
    const newDate = chars.join('');
    return {
      date: newDate,
      hour: stat.hour,
      impressions: stat.impressions,
      clicks: stat.clicks,
      revenue: stat.revenue,
    };
  });

  const [startDate, setStartDate] = useState(new Date(newStats[0].date));

  // gets dates that match selected date in calendar
  let filteredStats = newStats.filter((stat) => {
    return stat.date === startDate.toISOString();
  });

  let dates = newStats.map((stat) => new Date(stat.date).toISOString());

  const changeDate = (date) => {
    setStartDate(date);
  };

  const allKeys = ['impressions', 'clicks', 'revenue'];

  const colors = {
    impressions: 'darkturquoise',
    clicks: 'magenta',
    revenue: 'orange',
  };

  const [keys, setKeys] = useState(allKeys);
  const [data, setData] = useState(filteredStats);

  const [name, setName] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  // searchbox filtering
  useEffect(() => {
    const results = stats.filter(
      (stat) =>
        stat.hour.toString().includes(name) +
        stat.impressions.toString().includes(name) +
        stat.clicks.toString().includes(name) +
        stat.revenue.toString().includes(name) +
        stat.date.slice(0, 10).includes(name)
    );
    setFilteredList(results);
  }, [name]);

  useEffect(() => {
    filteredStats = newStats.filter((stat) => {
      return stat.date === startDate.toISOString();
    });
    setData(filteredStats);
  }, [startDate]);

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // orders the different values in stack on graph
    const stackGenerator = stack().keys(keys).order(stackOrderAscending);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];

    // x-scale
    const xScale = scalePoint()
      .domain(data.map((d) => d.hour))
      .range([0, width]);

    // y-scale
    const yScale = scaleLinear().domain(extent).range([height, 0]);

    // creates svg display
    const areaGenerator = area()
      .x((sequence) => xScale(sequence.data.hour))
      .y0((sequence) => yScale(sequence[0]))
      .y1((sequence) => yScale(sequence[1]))
      .curve(curveCardinal);

    svg
      .selectAll('.layer')
      .data(layers)
      .join('path')
      .attr('class', 'layer')
      .attr('fill', (layer) => colors[layer.key])
      .attr('d', areaGenerator);

    const xAxis = axisBottom(xScale);
    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select('.y-axis').call(yAxis);
  }, [colors, data, dimensions, keys]);

  return (
    <Layout>
      <h2 className={styles.Title}>
        # of Impressions vs. Clicks vs. Revenue (Hourly)
      </h2>
      <div className={styles.Chart}>
        <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
          <svg ref={svgRef}>
            <g className='x-axis' />
            <g className='y-axis' />
          </svg>
        </div>
      </div>

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

      <div style={{ textAlign: 'center' }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => changeDate(date)}
          minDate={new Date(dates[0])}
          maxDate={new Date(dates[dates.length - 1])}
          placeholderText='Select a date!'
        />
      </div>

      <h2 className={styles.Title}>Table Data</h2>

      <SearchBar
        placeholder='Search statistics...'
        getQuery={(q) => setName(q)}
      />

      <table className={styles.HourlyStats}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Hour</th>
            <th>Impressions</th>
            <th>Clicks</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((stat, index) => (
            <tr className={styles.row} key={index}>
              <td>{stat.date.slice(0, 10)}</td>
              <td>{stat.hour}</td>
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

export default HourlyStats;

export const getStaticProps = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + '/stats/hourly'
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
