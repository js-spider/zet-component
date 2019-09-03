import * as React from 'react';
import { Row, Col } from 'antd';

export interface ZetCatalogueProps {
  /** 要显示的内容 */
  data: Array<React.ReactNode>;
  /** 目录的显示列数 */
  x: number;
}

class ZetCatalogue extends React.PureComponent<ZetCatalogueProps, any> {
  getCols = () => {
    const { data, x } = this.props;
    const res = [];
    for(let i=0;i<x;i++){
      res.push([])
    }
    data.forEach((v, i)=>{
      if((i+1)/x<=1){
        res[i].push(v);
      }else{
        const xIndex = (i+1)%x-1 === -1 ? x-1 : (i+1)%x-1;
        res[xIndex].push(v);
      }
    })
    return res;
  }
  getX=()=>{
    const { x } = this.props;
    const res = [];
    for(let i=0;i<x;i++){
      res.push(i)
    }
    return res;
  }
  render() {
    const { data, x } = this.props;
    const xlens = this.getX();
    const newData = this.getCols()
    const H = 100/Math.ceil(data.length/x);
    return (
      <Row type="flex" style={{ height:'100%' }} gutter={16}>
        {
          xlens.map((v)=>{
            return (<Col style={{ height: '100%' }} span={Math.floor(24/x)}>
                {
                  newData[v].map((a)=>{
                    return (
                      <div style={{ display:'flex', alignItems: 'center',height: `${H}%`}}>{a}</div>
                    )
                  })
                }
            </Col>)
          })
        }
      </Row>
    );
  }
}
export default ZetCatalogue;
