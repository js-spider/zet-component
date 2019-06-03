import React from "react";
import { Row, Col } from "antd";
import moment from "moment";

import MetricsConfig from "../config/metrics";
import { LocaleReceiverHoc } from "../../utils/hoc";
import './index.less';

export interface RowColProps {
  data: any[];
  id: string;
  title: string;
}

class RowCol extends React.Component<RowColProps, any> {

  constructor(props: RowColProps) {
    super(props);
  }

  render() {
    const { id, data, title } =  this.props;
    return (
      <div id={id}>
        <h3 className={'dashedBorder'}>{title}</h3>
          {data.map(d => {
            return (
              <Row key={1} className={'smallinfo'}>{
                Object.keys(d).map(v => {
                  return (
                    <div key={2}>
                      {v === '__title__' ?
                        <Row className={'smalltitle'}>{d[v]}</Row> :
                        <Col span={8} className={'col'}>
                          {v}:
                          <span className={'value'}>
                            {
                              Array.isArray(d[v]) ?
                                d[v].map(i => {
                                  return <span key={3} style={{ flex: 1 / d[v].length, marginLeft: 10 }}>{i}</span>;
                                }) : <span style={{ marginLeft: 10 }}>{d[v]}</span>
                            }
                          </span>
                        </Col>
                      }
                    </div>);
                })}
            </Row>);
          })}
      </div>
    );
  }
}

export default RowCol;
