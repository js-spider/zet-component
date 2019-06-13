import React, { PureComponent } from 'react';
import { Chart, Tooltip, Axis, View, Geom } from 'bizcharts';
import { DataView } from '@antv/data-set';

class CurveChart extends PureComponent {
  render() {
    const { data, height } = this.props;
    const newData = data.map((item) => ({ x: item['False positive rate'], y: item['True positive rate'] }));
    const dv1 = new DataView().source(newData);
    const dv2 = new DataView().source([newData[0], newData[newData.length - 1]]);
    const scale = {
      x: {
        min: 0,
        max: 1,
        alias: 'False positive rate',
        tickCount: 11,
        formatter: (value) => {
          return `${(value * 100).toFixed(0).toString()}%`;
        },
      },
      y: {
        min: 0,
        max: 1,
        alias: 'True positive rate',
        tickCount: 11,
        formatter: (value) => {
          return `${(value * 100).toFixed(0).toString()}%`;
        },
      },
    };
    if (this.chart) {
      this.chart.forceFit();
    }
    return (
      <Chart
        forceFit
        height={height}
        scale={scale}
        padding='auto'
        onGetG2Instance={(chart) => {
          this.chart = chart;
        }}
      >
        <Tooltip />
        <View data={dv1.rows}>
          <Axis />
          <Geom type='line' shape='smooth' position='x*y' color="#95D4FB" />
        </View>
        <View data={dv2.rows}>
          <Geom type='line' shape='dash' position='x*y' color="#e56285" tooltip={false} />
        </View>
      </Chart>
    );
  }
}

export default CurveChart;
