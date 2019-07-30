import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

class Line extends React.Component {
  state = {};

  render() {
    const { data, xname, yname, xAlias, yAlias } = this.props;
    const newData = data.chartData && data.chartData.map(d => ({ x: d[xname], y: d[yname] }));
    const cols = {
      [yname]: {
        alias: yname || yAlias,
        min: 0,
      },
      [xname]: {
        alias: xname || xAlias,
        range: [0, 1],
      },
    };
    if (this.chart) {
      this.chart.forceFit();
    }
    return (
      <Chart
        height={400}
        data={newData}
        scale={cols}
        forceFit
        onGetG2Instance={chart => {
          this.chart = chart;
        }}
      >
        <Axis name="x" title={{ offset: 62 }} />
        <Axis name="y" title={{ offset: 62 }} />
        <Tooltip
          crosshairs={{
            type: 'y',
          }}
        />
        <Geom type="line" position="x*y" size={2} />
        {/* <Geom
          type='point'
          position='x*y'
          size={4}
          shape='circle'
          style={{
            stroke: '#fff',
            lineWidth: 1,
          }}
        /> */}
      </Chart>
    );
  }
}

export default Line;
