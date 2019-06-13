import React from "react";
import {Tabs } from "antd";
import { LocaleReceiverHoc } from "../../utils/hoc";
import { Components } from "../../index";
import Roc from "./roc";
import './index.less';

const { TabPane } = Tabs;
const { Chart } = Components;
const { Line, Line2 } = Chart;

export interface ReportProps {
  data: ReportDataProps;
  windowStatus: string;
}

export interface ReportDataProps {
  roc_curve?: any[];
  precision_recall_curve?: object;
  lift_curve?: object;
  ks_curve?: KsProps;
  gain_curve?: object;
}

export interface KsProps {
  ks: string;
}

class Report extends React.Component<ReportProps, any> {
  constructor(props: ReportProps) {
    super(props);
  }
  render() {
    const { data, windowStatus } = this.props;
    return (
        <Tabs defaultActiveKey='roc_curve'>
          {data.roc_curve
          && Object.keys(data.roc_curve).length > 0
          && (
            <TabPane tab='ROC' key='roc_curve'>
              <div style={{ marginBottom: 24 }}>
                <Roc
                  data={data.roc_curve}
                  height={400}
                  windowStatus={windowStatus}
                />
              </div>
            </TabPane>
          )
          }
          {data.precision_recall_curve && (
            <TabPane tab='Recall' key='precision_recall_curve'>
              <Line
                xname='x' yname='y' xAlias='ceshiyi' yAlias='ceshier'
                data={data.precision_recall_curve}
                windowStatus={windowStatus}
              />
            </TabPane>
          )}
          {data.lift_curve && (
            <TabPane tab='Lift' key='lift_curve'>
              <Line xname='Percentage of sample' yname='Lift' data={data.lift_curve} windowStatus={windowStatus} />
            </TabPane>
          )}
          {data.ks_curve && (
            <TabPane tab='K-S' key='ks_curve'>
              <div>{data.ks_curve.ks}</div>
              <Line2 data={data.ks_curve} windowStatus={windowStatus} />
            </TabPane>
          )}
          {data.gain_curve && (
            <TabPane tab='Gain' key='gain_curve'>
              <Line xname='Percentage of sample' yname='Gain' data={data.gain_curve} windowStatus={windowStatus} />
            </TabPane>
          )}
        </Tabs>
    );
  }
}

export default Report;
