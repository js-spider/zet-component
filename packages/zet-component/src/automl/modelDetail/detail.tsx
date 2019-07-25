import React from "react";
import { Anchor, Tabs } from "antd";

import { LocaleReceiverHoc } from "../../utils/hoc";
import './index.less';
import RowCol from './row-col';
import PipeLine from './pipeline';
import CompareCharts from './compareCharts';
import CompareTable from './compareTable';
import Attachments from './attachments';
import List from './list';
import Report from './report';
import Matrix from './matrix';
import MatrixDetail from '../confusionMatrix';
import BarChart1 from '../../components/charts/barChart1';
import SliderChart from '../../components/charts/sliderChart';
import Rect5 from '../../components/charts/rect5';
import Line from '../../components/charts/line';
import Line2 from '../../components/charts/line2';
import { Threshold, IsolatedForests, autoFormat, legendExtend,
  isolatedForestsScales, thresholdScales } from './config/chartConfig';

const { Link } = Anchor;
const { TabPane } = Tabs;

export interface LinksProps {
  id: string;
  title: string;
  /** 组件类型（RowCol、PipeLine、Report、Compare、Attachments） */
  type: string;
  data: any;
}

export interface DetailProps {
  links: LinksProps[];
}

class Detail extends React.Component<DetailProps, any> {
  state = {
    windowStatus: 'normal',
  };

  constructor(props: DetailProps) {
    super(props);
  }
  render() {
    const { links } = this.props;
    return (
      <div className={'listDetail'} id='detail'>
        <div className={'listDetail-content'}>
          <div style={{ width: '112px' }} className={'listDetailContentleft'} id='zetLeft'>
            <Anchor getContainer={() => document.getElementById('zetRight')}>
              {
                links.map(v => {
                  return v && <Link key={v.id} href={'#' + v.id} title={v.title} />;
                })
              }
            </Anchor>
          </div>
          <div className={'listDetailContentright'} id='zetRight'>
            {
              links.map(v => {
                if(!v) return;
                switch (v.type) {
                  case 'RowCol':
                    return (
                      <div>
                        <h3 id={v.id} className={'dashedBorder'}>{v.title}</h3>
                        <RowCol data={v.data} />
                      </div>
                    );
                    break;
                  case 'PipeLine':
                    return (
                      <div>
                        <h3 id={v.id} className={'dashedBorder'}>{v.title}</h3>
                        <PipeLine data={v.data} />
                        <div style={{ height: 16 }} />
                      </div>
                    );
                    break;
                  case 'Report':
                    return (
                      <div>
                        <h3 id={v.id} className={'dashedBorder'}>{v.title}</h3>
                        {v.data && (
                          <span>
                            {v.data.plotChart && (
                              <span>
                                <div className={'smalltitle'}>分类情况</div>
                                <BarChart1 data={v.data.plotChart} />
                              </span>
                            )}
                            {v.data.thresholdChart && (
                              <span>
                                <div className={'smalltitle'}>可视化曲线</div>
                                <SliderChart
                                  data={v.data.thresholdChart.data}
                                  height={360}
                                  scales={thresholdScales('y', v.data.thresholdChart.metricName).scales}
                                  options={{
                                    autoFormat: autoFormat('y'),
                                    legendExtend: legendExtend(Threshold),
                                  }}
                                />
                              </span>
                            )}
                            {v.data.thresholdChart1 && (
                              <span>
                                <div className={'smalltitle'}>可视化曲线</div>
                                 <SliderChart
                                   data={v.data.thresholdChart1.data}
                                   height={360}
                                   scales={isolatedForestsScales('y', v.data.thresholdChart1.metricName).scales}
                                   options={{
                                     legendExtend: legendExtend(IsolatedForests),
                                   }}
                                 />
                              </span>
                            )}
                            {v.data.featureImportance && (
                              <Rect5 data={v.data.featureImportance} windowStatus={this.state.windowStatus} />
                            )}
                            {v.data.modelPerformance && (
                              <span>
                              <Report data={v.data.modelPerformance} windowStatus={this.state.windowStatus} />
                              {(v.data.modelPerformance.confusion_matrix_cut
                                || v.data.modelPerformance.confusion_matrix) && (
                                <div style={{ marginBottom: 24 }}>
                                  <div className={'smalltitle'}>混淆矩阵</div>
                                  {
                                    v.data.modelPerformance.confusion_matrix_cut
                                    && v.data.modelPerformance.confusion_matrix_cut.y
                                      ? <MatrixDetail data={v.data.matrixData} />
                                      : <Matrix matrixdata={v.data.modelPerformance.confusion_matrix} />
                                  }
                                </div>
                              )}
                              </span>
                            )}
                            {v.data.metrics && v.data.metrics.length > 0 && (
                              <div className={'box'}>
                                <List data={v.data.metrics} />
                              </div>
                            )}
                          </span>
                        )}
                        <div className={'smalltitle'}>算法</div>
                        {v.data.arithmetic && (
                          <span>
                            <List data={v.data.arithmetic} />
                            <div style={{ height: 16 }} />
                          </span>
                        )}
                        {v.data.train && (
                          <span>
                            <List data={v.data.train} />
                            <div style={{ height: 16 }} />
                          </span>
                        )}
                      </div>
                    );
                    break;
                  case 'Compare':
                    return (
                      <div>
                        <h3 id={v.id} className={'dashedBorder'}>{v.title}</h3>
                        {v.data.charts && (
                          <span>
                            <div className={'smalltitle'}>模型和特征概述</div>
                            <CompareCharts
                              windowStatus={'normal'}
                              compareCharts={v.data.charts.compareCharts}
                              compareChartsType={v.data.charts.compareChartsType}
                              compareChartsModels={v.data.charts.compareChartsModels}
                              compareChartsModels1={v.data.charts.compareChartsModels1}
                              currentJob={v.data.charts.currentJob}
                            />
                          </span>
                          )}
                        {v.data.tables && (
                          <span>
                            <div className={'smalltitle'}>参数对比</div>
                            <CompareTable
                              dataCompare={v.data.tables.dataCompare}
                              currentJob={v.data.tables.currentJob}
                            />
                            <div style={{ height: 16 }} />
                          </span>
                        )}
                      </div>
                    );
                    break;
                  case 'Attachments':
                    return (
                      <div>
                        <h3 id={v.id} className={'dashedBorder'}>{v.title}</h3>
                        <Attachments data={v.data} />
                      </div>
                    );
                    break;
                }
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
