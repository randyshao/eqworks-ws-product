import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout/Layout';
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  axisRight,
  scaleLinear,
} from 'd3';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HourlyStats = ({ stats }) => {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(0);
  const [startDate, setStartDate] = useState(new Date(stats[0].date));

  let dates = stats.map((stat) => new Date(stat.date).toISOString());

  let filteredStats = stats.filter((stat) => {
    return stat.date === startDate.toISOString();
  });

  let impressions = filteredStats.map((stat) => stat.impressions);
  let clicks = filteredStats.map((stat) => stat.clicks);
  let revenue = filteredStats.map((stat) => stat.revenue);

  const onButtonClick = (index) => {
    setActive(index);
    if (index === 0) {
      setData(impressions);
    } else if (index === 1) {
      setData(clicks);
    } else {
      setData(revenue);
    }
  };

  const labels = ['Impressions', 'Clicks', 'Revenue'];
  const buttonGroup = labels.map((label, index) => {
    return (
      <button
        key={index}
        onClick={() => onButtonClick(index)}
        className={active === index ? 'active' : null}
      >
        {label}
      </button>
    );
  });

  const changeDate = (date) => {
    setStartDate(date);
    if (active === 0) {
      setData(impressions);
    } else if (active === 1) {
      setData(clicks);
    } else {
      setData(revenue);
    }
  };

  useEffect(() => {
    setData(impressions);
  }, []);

  const svgRef = useRef();

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 600]);

    const yScale = scaleLinear()
      .domain([0, Math.max(...data) * 1.4])
      .range([300, 0]);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1);
    svg.select('.x-axis').style('transform', 'translateY(300px)').call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select('.y-axis').style('transform', 'translateX(600px)').call(yAxis);

    // generates the "d" attribute of a path element
    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    // renders path element, and attaches
    // the "d" attribute from line generator above
    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('d', myLine)
      .attr('fill', 'none')
      .attr('stroke', 'blue');
  }, [data]);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className={styles.title}>Event Charts</h1>

      <h2 className={styles.title}>Chart Title</h2>

      <div className={styles.Graph}>
        <svg ref={svgRef}>
          <g className='x-axis' />
          <g className='y-axis' />
        </svg>
        {buttonGroup}
      </div>

      <DatePicker
        selected={startDate}
        onChange={(date) => changeDate(date)}
        minDate={new Date(dates[0])}
        maxDate={new Date(dates[dates.length - 1])}
        placeholderText='Select a date!'
      />

      <h2 className={styles.title}>Database Tables</h2>

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
            <tr className={styles.row} key={stat.revenue}>
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
  const res = await fetch('http://localhost:5555/stats/hourly');
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
