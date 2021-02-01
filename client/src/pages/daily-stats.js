import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout/Layout';
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

const DailyStats = ({ stats }) => {
  const allKeys = ['impressions', 'clicks', 'revenue'];

  const colors = {
    impressions: 'darkturquoise',
    clicks: 'magenta',
    revenue: 'orange',
  };

  const [keys, setKeys] = useState(allKeys);
  const [data, setData] = useState(stats);

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

    const xScale = scalePoint()
      .domain(data.map((d) => d.date.slice(0, 10)))
      .range([0, width]);

    const yScale = scaleLinear().domain(extent).range([height, 0]);

    const areaGenerator = area()
      .x((sequence) => xScale(sequence.data.date.slice(0, 10)))
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
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className={styles.title}>Event Charts</h1>
      <h2 className={styles.title}># of Impressions vs. Clicks vs. Revenue</h2>

      <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
        <svg ref={svgRef}>
          <g className='x-axis' />
          <g className='y-axis' />
        </svg>
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
