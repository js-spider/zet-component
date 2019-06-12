import React from "react";
import { Row, Col } from "antd";
import moment from "moment";

import MetricsConfig from "../config/metrics";
import { LocaleReceiverHoc } from "../../utils/hoc";
import './index.less';

export interface RowColProps {
  data: [ DataProps[]];
}

export interface DataProps {
  key: any;
  value: any;
}

class RowCol extends React.Component<RowColProps, any> {

  constructor(props: RowColProps) {
    super(props);
  }

  render() {
    const { data } =  this.props;
    return (
      <div>
          {data.map(d => {
            return (
              <Row key={1} className={'smallinfo'}>{
                d.map(v => {
                  return (
                    <div key={2}>
                      {v.key === '__title__' ?
                        <Row className={'smalltitle'}>{v.value}</Row> :
                        <Col span={8} className={'col'}>
                          {v.key}:
                          <span className={'value'}>
                            {
                              Array.isArray(v.value) ?
                                v.value.map(i => {
                                  return (
                                    <span key={3} style={{ flex: 1 / v.value.length, marginLeft: 10 }}>
                                      {i}
                                    </span>
                                  );
                                })
                                :
                                <span style={{ marginLeft: 10 }}>{v.value}</span>
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
