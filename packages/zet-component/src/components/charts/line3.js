import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from 'bizcharts';

class Line3 extends React.Component {
  state = {}

  render() {
    const { data, compareChartsModels, compareChartsModels1 } = this.props;
    const cols = {
      y: {
        // min: 0,
      },
      x: {
        formatter: (value) => {
          // console.log(value);
          return compareChartsModels[value];
        },
      },
    };
    if (this.chart) {
      this.chart.forceFit();
    }
    const { currentJob } = this.props;
    return (
      <div>
        <Chart
          height={400}
          data={data}
          scale={cols}
          forceFit
          onGetG2Instance={(chart) => {
            this.chart = chart;
          }}
        >
          <Axis
            name='x'
            label={{
              textStyle: (text) => {
                console.log(text);
                return { fill: compareChartsModels1[text] === currentJob ? 'red' : '#000000' };
              },
            }}
          />
          <Axis name='y' />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type='line' shape='smooth' position='x*y' size={2} />
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
      </div>
    );
  }
}

export default Line3;
