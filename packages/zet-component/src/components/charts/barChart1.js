import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from 'bizcharts';

class BarChart1 extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <Chart
        height={300}
        data={data}
        forceFit
        // scale={{ y: { alias: chart } }}
        padding={[40, 40, 40, 60]}
      >
        <Axis name='x' />
        <Axis name='y' />
        <Tooltip inPlot={false} crosshairs={{ type: 'rect' }} />
        <Geom size={24} type="interval" color='#13c2c2' position="x*y" />
      </Chart>
    );
  }
}

export default BarChart1;
