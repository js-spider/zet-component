import React from 'react';
import { Row,Col,Slider,Input, Table,Button } from 'antd';
import { Components } from '../../index';
import { ColumnProps } from "antd/lib/table";


const { Chart:{Hhistogram}} = Components;
const defaultCut = [
  0.0,
  0.025,
  0.05,
  0.07500000000000001,
  0.1,
  0.125,
  0.15000000000000002,
  0.17500000000000002,
  0.2,
  0.225,
  0.25,
  0.275,
  0.30000000000000004,
  0.325,
  0.35000000000000003,
  0.375,
  0.4,
  0.42500000000000004,
  0.45,
  0.47500000000000003,
  0.5,
  0.525,
  0.55,
  0.5750000000000001,
  0.6000000000000001,
  0.625,
  0.65,
  0.675,
  0.7000000000000001,
  0.7250000000000001,
  0.75,
  0.775,
  0.8,
  0.8250000000000001,
  0.8500000000000001,
  0.875,
  0.9,
  0.925,
  0.9500000000000001,
  0.9750000000000001
]

interface MatrixData{
  cut:number[];
  tp:number[];
  fn:number[];
  fp:number[];
  tn:number[];
  precision:number[];
  recall:number[];
  f1:number[];
  accuracy:number[];
}
interface Props{
  form?:any;
  initialValue?:number;
  data:MatrixData;
}
interface MatrixTable{
  title: string;
  render: () => React.ReactNode;
}

class MatrixDetail extends React.Component<Props,any>{
  static defaultProps = {
    initialValue:0.5,
    data:{
      cut:defaultCut
    }
  }
  constructor(props){
    super(props);
    this.state={
      sliderValue:0,
      matrixData:{}
    }
  }
  componentDidMount(){
    const {initialValue} = this.props;
    this.onSliderChange(initialValue)
  }
  getMatrixDataItem = (value)=>{
    const {data} = this.props;
    data.cut = data.cut || defaultCut;
    let index = -1;
    for(let item of data.cut){
      if(item - value > 0.01){
        break;
      }
      index ++;
    }
    const matrixData = {};
    Object.keys(data).forEach(key=>{
      matrixData[key] = data[key][index];
    })
    return matrixData
  }
  onSliderChange = (value)=>{
    const item = this.getMatrixDataItem(value);
    this.setState({
      sliderValue:value,
      matrixData:item
    })
  }
  getPredictTitle = (type)=>{
    return (
      <div style={{textAlign:'center'}}>
        {/* <span style={{margin:'10px 0px',display:'block'}} >Predicted</span> */}
        <Button  disabled={true} size={'small'}>{type === 'yes'? 'YES':'NO'}</Button>
      </div>
    )
  }
  getActually = (type)=>{
    return(
      <span>
        {/* Actually
        <Button disabled={true} style={{marginLeft:15}} size={'small'}>{type==='yes' ? 'YES':'NO'}</Button> */}
        <Button disabled={true}  size={'small'}>{type==='yes' ? 'YES':'NO'}</Button>
      </span>
    )
  }
  getStyleValue = (type,value)=>{
    return type==='success' ?
     <span style={{color:'#13c2c2'}}>{value}</span>
     :
     <span style={{color:'#f5222d'}}>{value}</span>
  }
  getTableColumn = () => {
    const columns: ColumnProps<MatrixTable>[] = [
      {
        title: '',
        children: [
          {
            title: '实际',
            dataIndex: 'actual',
            key: 'actual',
            align:'center'
          },
        ],
      },
      {
        title: '预测',
        children: [
          {
            title: this.getPredictTitle('yes'),
            dataIndex: "predicted_yes",
            align:'center'
          },
          {
            title: this.getPredictTitle('no'),
            dataIndex: "predicted_no",
            align:'center'
          },
          {
            title: "Total",
            dataIndex: "total",
            align:'center'
          }
        ],
      },
      
    ]
    return columns
  }
  getDataSource = (matrixData) =>{
    const dataSource : any[] =  [
      {
        id:'index',
        actual:this.getActually('yes'),
        predicted_yes:this.getStyleValue('success',matrixData.tp),
        predicted_no: this.getStyleValue('failed',matrixData.fn),
        total: matrixData.tp + matrixData.fn
      },
      {
        id:'index1',
        actual:this.getActually('no'),
        predicted_yes:this.getStyleValue('failed',matrixData.fp),
        predicted_no: this.getStyleValue('success',matrixData.tn),
        total: matrixData.fp + matrixData.tn
      },
      {
        id:'index2',
        actual:'Total',
        predicted_yes:matrixData.tp+matrixData.fp,
        predicted_no: matrixData.fn + matrixData.tn,
        total:matrixData.tp + matrixData.fn + matrixData.fp + matrixData.tn
      },
    ]
    return dataSource;
  }
  backToOptimal = ()=>{
    const { initialValue } = this.props;
    (initialValue || initialValue===0) && this.onSliderChange(initialValue)
  }
  
  formatChartData = (matrixData) => {
    return ['accuracy','f1','recall','precision'].map((item,index)=>({
       y:item,
       x:matrixData[item]
    }))
  }
  render(){
    const { sliderValue, matrixData } = this.state;
    const { initialValue } = this.props;
    const columns = this.getTableColumn();
    const dataSource = this.getDataSource(matrixData)
    const chartData = this.formatChartData(matrixData);
    return (
      <React.Fragment>
        <Row gutter={20}>
          <Col span={6}>
            <span>Threshold(cut-off)</span>
          </Col>
          <Col span={8}>
            <Slider marks={{0:0,1:1}} min={0} max={1} step={0.025} onChange={this.onSliderChange} value={sliderValue}></Slider>
          </Col>
          <Col span={10}>
            <Input style={{width:65}} disabled={true} value={sliderValue}></Input>
            <Button style={{width:150,marginLeft:20}} disabled={initialValue===sliderValue} onClick={this.backToOptimal} >BACK TO OPTIMAL*</Button>
          </Col>
        </Row>
        <Row style={{marginTop:30}}>
          <Table
            columns={columns}
            dataSource={dataSource}
            bordered={true}
            pagination={false}
          >
          </Table>
        </Row>
        <Row>
          <Hhistogram data={chartData}></Hhistogram>
        </Row>
      </React.Fragment>
    )
  }
}

export default MatrixDetail