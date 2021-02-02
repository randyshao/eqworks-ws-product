import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import useResizeObserver from '../hooks/useResizeObserver';
import {
  select,
  scaleBand,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
} from 'd3';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HourlyEvents = ({ stats }) => {
  // Returns stats object with correctly reformatted ISO 8601 date
  const newStats = stats.map((stat) => {
    const chars = stat.date.split('');
    chars[12] = '5';
    const newDate = chars.join('');
    return {
      date: newDate,
      hour: stat.hour,
      events: stat.events,
    };
  });

  const [startDate, setStartDate] = useState(new Date(newStats[0].date));

  let filteredStats = newStats.filter((stat) => {
    return stat.date === startDate.toISOString();
  });

  let dates = newStats.map((stat) => new Date(stat.date).toISOString());

  const changeDate = (date) => {
    setStartDate(date);
  };

  const allKeys = ['events'];

  const colors = {
    events: 'darkturquoise',
  };

  const [keys, setKeys] = useState(allKeys);
  const [data, setData] = useState(filteredStats);

  const [name, setName] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const results = stats.filter(
      (stat) =>
        stat.hour.toString().includes(name) +
        stat.events.toString().includes(name) +
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

    const stackGenerator = stack().keys(keys).order(stackOrderAscending);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];

    const xScale = scaleBand()
      .domain(data.map((d) => d.hour))
      .range([0, width])
      .padding(0.25);

    const yScale = scaleLinear().domain(extent).range([height, 0]);

    svg
      .selectAll('.layer')
      .data(layers)
      .join('g')
      .attr('class', 'layer')
      .attr('fill', (layer) => colors[layer.key])
      .selectAll('rect')
      .data((layer) => layer)
      .join('rect')
      .attr('x', (sequence) => xScale(sequence.data.hour))
      .attr('width', xScale.bandwidth())
      .attr('y', (sequence) => yScale(sequence[1]))
      .attr('height', (sequence) => yScale(sequence[0]) - yScale(sequence[1]));

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
      <h2 className={styles.Title}># of Events (Hourly)</h2>
      <div className={styles.Chart}>
        <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
          <svg ref={svgRef}>
            <g className='x-axis' />
            <g className='y-axis' />
          </svg>
        </div>
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

      <table className={styles.HourlyEvents}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Hour</th>
            <th># of Events</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((stat, index) => (
            <tr className={styles.row} key={index}>
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
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + '/events/hourly'
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
