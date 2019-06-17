import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  View,
  Legend,
} from 'bizcharts';
import { DataView } from '@antv/data-set';

class Line2 extends React.Component {
  state = {}

  render() {
    const { data } = this.props;
    const data1 = [];
    const data2 = [];
    const newData = data.chartData.forEach(d => {
      if (d.type === 'KS Statistic') {
        data2.push({ y: d['Percentage below threshold'], x: d['Threshold'], type: d.type });
      } else {
        data1.push({ y: d['Percentage below threshold'], x: d['Threshold'], type: `${d.type}` });
      }
    });
    const dv1 = new DataView().source(data1);
    const dv2 = new DataView().source(data2);
    const cols = {
      y: {
        min: 0,
        max: 1,
      },
      x: {
        // type: 'linear',
        // range: [0, 1],
        min: 0,
        max: 1,
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
        onGetG2Instance={(chart) => {
          this.chart = chart;
        }}
      >
        {/* <Axis name='x' />
        <Axis name='y' /> */}
        <Tooltip
          crosshairs={{
            type: 'y',
          }}
        />
        <Legend name='type' />
        <View data={dv1.rows}>
          <Axis />
          <Geom type='line' shape='smooth' position='x*y' color={['type', ['blue', 'green']]} size={2} />
          {/* <Geom
            type='point'
            position='x*y'
            size={4}
            shape='circle'
            color={['type', ['blue', 'green']]}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          /> */}
        </View>
        <View data={dv2.rows}>
          {/* <Axis /> */}
          <Geom type='line' shape='dash' position='x*y' color={['type', ['red']]} tooltip={false} />
          <Geom
            type='point'
            position='x*y'
            size={4}
            shape='circle'
            color={['type', ['red']]}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </View>
        {/* <Geom type='line' position='x*y' size={2} />
        <Geom
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
export default Line2;
