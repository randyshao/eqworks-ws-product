import { useState, useEffect, useRef } from 'react';
import useResizeObserver from '../../hooks/useResizeObserver';
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

const StackedChart = ({ stats, keys, colors }) => {
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
    <div>
      <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
        <svg ref={svgRef}>
          <g className='x-axis' />
          <g className='y-axis' />
        </svg>
      </div>
    </div>
  );
};

export default StackedChart;
