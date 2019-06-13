import React, { PureComponent } from 'react';
import { Chart, Tooltip, Axis, Geom, Coord } from 'bizcharts';
import { DataView } from '@antv/data-set';

class RectChart extends PureComponent {
  render() {
    const { data } = this.props;
    const newData = Object.keys(data).map(key => ({
      x: key, y: data[key],
    }));
    const dv = new DataView().source(newData);
    dv.transform({
      type: 'sort',
      callback(a, b) {
        return a.y - b.y;
      },
    });
    if (this.chart) {
      this.chart.forceFit();
    }
    return (
      <Chart
        forceFit
        height={330}
        data={dv.rows}
        padding='auto'
        onGetG2Instance={(chart) => {
          this.chart = chart;
        }}
      >
        <Coord transpose />
        <Tooltip itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{value}</li>' />
        <Axis dataKey='x' label={{ offset: 12 }} />
        <Geom type='interval' shape='rect' position='x*y' color='#9BDADE' />
      </Chart>
    );
  }
}

export default RectChart;
