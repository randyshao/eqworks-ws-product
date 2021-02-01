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

const DailyStats = ({ stats }) => {
  const [data, setData] = useState([]);

  let impressions = stats.map((stat) => stat.impressions);
  let clicks = stats.map((stat) => stat.clicks);
  let revenue = stats.map((stat) => stat.revenue);

  useEffect(() => {
    setData(impressions);
  }, []);

  const setImpressions = () => {
    setData(impressions);
  };

  const setClicks = () => {
    setData(clicks);
  };

  const setRevenue = () => {
    setData(revenue);
  };

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
      .tickFormat((index) => 'Jan ' + (index + 1));
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
      <h2 className={styles.title}>Database Tables</h2>

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
            <tr className={styles.row} key={stat.impressions}>
              <td>{stat.date.slice(0, 10)}</td>
              <td>{stat.impressions}</td>
              <td>{stat.clicks}</td>
              <td>{parseFloat(stat.revenue).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className={styles.title}># of Impressions</h2>

      <div className={styles.Graph}>
        <svg ref={svgRef}>
          <g className='x-axis' />
          <g className='y-axis' />
        </svg>
        <button onClick={setImpressions}>Impressions</button>
        <button onClick={setClicks}>Clicks</button>
        <button onClick={setRevenue}>Revenue</button>
      </div>
    </Layout>
  );
};

export default DailyStats;

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:5555/stats/daily');
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
