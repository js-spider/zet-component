import React from "react";
import { Anchor, Button, Row, Col, List, Tabs, Tooltip } from 'antd';
import moment from "moment";

import Line3 from "../../components/charts/line3";
import { LocaleReceiverHoc } from "../../utils/hoc";
import './index.less';
import data from "./mock";

const { TabPane } = Tabs;

export interface CompareChartsProps {
  compareCharts: any[];
  compareChartsType: any[];
  compareChartsModels: object;
  compareChartsModels1: object;
  currentJob: string;
  windowStatus: string;
}

class CompareCharts extends React.Component<CompareChartsProps, any> {

  constructor(props: CompareChartsProps) {
    super(props);
  }

  render() {
    const {
      windowStatus, compareCharts, compareChartsType, compareChartsModels,
      compareChartsModels1, currentJob,
    } = this.props;
    return (
      <Tabs defaultActiveKey={Object.keys(compareCharts)[0]}>
        {Object.keys(compareCharts).map(cctvalue => (
          <TabPane
            tab={compareChartsType.find(item => item.value === cctvalue).name}
            key={cctvalue}
          >
            <Line3
              xname='x'
              yname='y'
              data={compareCharts[cctvalue]}
              compareChartsModels={compareChartsModels}
              compareChartsModels1={compareChartsModels1}
              windowStatus={windowStatus}
              currentJob={currentJob}
            />
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

export default CompareCharts;
