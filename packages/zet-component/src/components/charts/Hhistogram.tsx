import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label
} from "bizcharts";
import DataSet from "@antv/data-set";


interface Props {
  data:any[];
  rename?:object;
}


export default class Hhistogram extends React.Component<Props,any> {
  render() {
    const {data,rename} = this.props;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    rename && dv.transform({
      type:'rename',
      map:rename
    })
    if(data.length === 0){
      return <div></div>
    }
    return (
      <div>
        <Chart height={300} data={dv} scale={{x:{min:0,max:1}}} forceFit padding={[20,60,20,80]} >
          <Coord transpose />
          <Axis
            name="y"
            label={{
              offset: 12,
              formatter:(text)=>{
                return {
                  precision:'Precision',
                  recall:'Recall',
                  f1:'F1-Score',
                  accuracy:'Accuracy'
                }[text] 
              }
            }}
            
          />
          <Axis name="x" label={{
            formatter:(text)=>{
              return `${Number(text)*100}%` 
            }
          }}/>
          <Tooltip/>
          <Geom type="interval" position="y*x" color={
            ['y',(y)=>{
              return {
                precision:'#1890ff',
                recall:'#13c2c2',
                f1:'#ffc53d',
                accuracy:'#ff7a45'
              }[y]
            }]
          }>
            <Label content={['x',(x)=>{
              return `${ (Number(x) * 100).toFixed(0) }%`
            }]} />
          </Geom>
        </Chart>
      </div>
    );
  }
}
