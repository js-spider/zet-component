import React, { Component } from 'react';
import { Components } from '../../index';
import ZetModal from '../../components/ZetModal';
// import BarChart1 from '../../components/charts/BarChart1';
import SliderChart from '../../components/charts/SliderChart';
import Rect5 from '../../components/charts/rect5';
import Line from '../../components/charts/line';
import Line2 from '../../components/charts/line2';
// import Line3 from '../../components/charts/line3';
import Roc from './roc';
import Matrix from './matrix';
import { Button, Icon, Tooltip, Tabs } from 'antd';
import ModelDetail from './index';
import RowCol from "./row-col";
import PipeLine from "./pipeline";
import data from "./mock";
import CompareCharts from "./compareCharts";
import CompareTable from "./compareTable";
// import Chart from "../../../dist/components/charts";
const { Chart } = Components;
const { BarChart1 } = Chart;
const { TabPane } = Tabs;

class Demo extends Component {
  state = {
    visible: false,
    windowStatus: 'normal',
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  onChangeSize = (value) => {
    this.setState({
      windowStatus: value,
    });
  }
  render() {
    const { windowStatus } = this.state;
    const arr = [
      <span>
        <Icon type="step-backward" />
        <Icon type="step-forward" />
      </span>
    ]
    const pipeline = '[{"modelId":null,"name":"Pipeline初始化","description":"Empty","orderId":0,"stepTransformer":[]},{"modelId":null,"name":"缺失值填充_连续型","description":"Empty","orderId":1,"stepTransformer":[{"stepId":"56f293d7-a24e-4775-8afd-653c3e7e814d","name":"datacanvas.api.dc_sklearn.features.Imputer","features":{"x1":"float64","x2":"float64","x3":"float64"},"transformer":"{\\"native_transformer\\": null, \\"type\\": \\"sklearn_dc\\", \\"schema\\": {\\"x1\\": \\"float64\\", \\"x2\\": \\"float64\\", \\"x3\\": \\"float64\\"}, \\"schema_str\\": \\"gAN9cQAoWAIAAAB4MXEBWAcAAABmbG9hdDY0cQJYAgAAAHgycQNYBwAAAGZsb2F0NjRxBFgCAAAAeDNxBVgHAAAAZmxvYXQ2NHEGdS4=\\", \\"need_fit\\": true, \\"_fitted\\": true, \\"name\\": \\"datacanvas.api.dc_sklearn.features.Imputer\\", \\"serialize_path\\": \\"/mnt/aps/project/dad5607c-9de7-4396-a4ea-11bc0d7d304e/job/425acc09-a0c1-4903-8534-657b9ed3572b/9449a186-15e4-475e-b1ef-b68410d2e2ad_5612e705-4da6-4e81-b4af-58880d224544.pkl\\", \\"input_cols\\": [\\"x1\\", \\"x2\\", \\"x3\\"], \\"output_cols\\": [\\"x1\\", \\"x2\\", \\"x3\\"], \\"strategy\\": \\"mean\\", \\"constant\\": null, \\"impute_map\\": {\\"x1\\": 3.0540000000000007, \\"x2\\": 3.7586666666666693, \\"x3\\": 1.1986666666666672}, \\"inputCols\\": [\\"x1\\", \\"x2\\", \\"x3\\"], \\"outputCols\\": [\\"x1\\", \\"x2\\", \\"x3\\"]}","pipelineType":"sklearn_dc","pipelineIndex":null,"orderId":0}]},{"modelId":null,"name":"随机采样","description":"Empty","orderId":2,"stepTransformer":[]},{"modelId":null,"name":"归一化","description":"Empty","orderId":3,"stepTransformer":[{"stepId":"fe0716ea-31ac-4066-9ad1-5a3db0d23965","name":"sklearn_pandas.dataframe_mapper.DataFrameMapper","features":{"x1":"float64","x2":"float64","x3":"float64"},"transformer":"{\\"features\\": [[[\\"x1\\"], {\\"feature_range\\": [0, 1], \\"copy\\": true, \\"n_samples_seen_\\": 150, \\"scale_\\": \\"[0.41666667]\\", \\"min_\\": \\"[-0.83333333]\\", \\"data_min_\\": \\"[2.]\\", \\"data_max_\\": \\"[4.4]\\", \\"data_range_\\": \\"[2.4]\\"}], [[\\"x2\\"], {\\"feature_range\\": [0, 1], \\"copy\\": true, \\"n_samples_seen_\\": 150, \\"scale_\\": \\"[0.16949153]\\", \\"min_\\": \\"[-0.16949153]\\", \\"data_min_\\": \\"[1.]\\", \\"data_max_\\": \\"[6.9]\\", \\"data_range_\\": \\"[5.9]\\"}], [[\\"x3\\"], {\\"feature_range\\": [0, 1], \\"copy\\": true, \\"n_samples_seen_\\": 150, \\"scale_\\": \\"[0.41666667]\\", \\"min_\\": \\"[-0.04166667]\\", \\"data_min_\\": \\"[0.1]\\", \\"data_max_\\": \\"[2.5]\\", \\"data_range_\\": \\"[2.4]\\"}]], \\"built_features\\": [[[\\"x1\\"], {\\"feature_range\\": [0, 1], \\"copy\\": true, \\"n_samples_seen_\\": 150, \\"scale_\\": \\"[0.41666667]\\", \\"min_\\": \\"[-0.83333333]\\", \\"data_min_\\": \\"[2.]\\", \\"data_max_\\": \\"[4.4]\\", \\"data_range_\\": \\"[2.4]\\"}, {}], [[\\"x2\\"], {\\"feature_range\\": [0, 1], \\"copy\\": true, \\"n_samples_seen_\\": 150, \\"scale_\\": \\"[0.16949153]\\", \\"min_\\": \\"[-0.16949153]\\", \\"data_min_\\": \\"[1.]\\", \\"data_max_\\": \\"[6.9]\\", \\"data_range_\\": \\"[5.9]\\"}, {}], [[\\"x3\\"], {\\"feature_range\\": [0, 1], \\"copy\\": true, \\"n_samples_seen_\\": 150, \\"scale_\\": \\"[0.41666667]\\", \\"min_\\": \\"[-0.04166667]\\", \\"data_min_\\": \\"[0.1]\\", \\"data_max_\\": \\"[2.5]\\", \\"data_range_\\": \\"[2.4]\\"}, {}]], \\"default\\": null, \\"built_default\\": null, \\"sparse\\": false, \\"df_out\\": true, \\"input_df\\": false, \\"transformed_names_\\": [\\"x1\\", \\"x2\\", \\"x3\\"], \\"transformers\\": [{\\"name\\": \\"sklearn.preprocessing.data.MinMaxScaler\\", \\"features\\": [\\"x1\\"]}, {\\"name\\": \\"sklearn.preprocessing.data.MinMaxScaler\\", \\"features\\": [\\"x2\\"]}, {\\"name\\": \\"sklearn.preprocessing.data.MinMaxScaler\\", \\"features\\": [\\"x3\\"]}], \\"name\\": \\"sklearn_pandas.dataframe_mapper.DataFrameMapper\\"}","pipelineType":"sklearn","pipelineIndex":null,"orderId":0}]},{"modelId":null,"name":"数据集拆分","description":"Empty","orderId":4,"stepTransformer":[]},{"modelId":null,"name":"XGBoost","description":"Empty","orderId":5,"stepTransformer":[{"stepId":"524a9e16-f8db-452a-ac23-c0dd31711424","name":"xgboost.sklearn.XGBClassifier","features":{"x0":"float64","x1":"float64","x2":"float64","x3":"float64"},"transformer":"{\\"max_depth\\": 6, \\"learning_rate\\": 0.1, \\"n_estimators\\": 10, \\"silent\\": true, \\"objective\\": \\"multi:softprob\\", \\"booster\\": \\"gbtree\\", \\"gamma\\": 0, \\"min_child_weight\\": 1, \\"max_delta_step\\": 0, \\"subsample\\": 1, \\"colsample_bytree\\": 1, \\"colsample_bylevel\\": 1, \\"reg_alpha\\": 0, \\"reg_lambda\\": 1, \\"scale_pos_weight\\": 1, \\"base_score\\": 0.5, \\"missing\\": 0, \\"kwargs\\": {}, \\"_Booster\\": {\\"feature_names\\": [\\"x1\\", \\"x2\\", \\"x3\\", \\"x0\\"], \\"feature_types\\": [\\"float\\", \\"float\\", \\"float\\", \\"float\\"], \\"handle\\": {}, \\"best_iteration\\": 9, \\"best_ntree_limit\\": 10}, \\"seed\\": null, \\"random_state\\": 0, \\"nthread\\": null, \\"n_jobs\\": -1, \\"classes_\\": \\"[\'Iris-setosa\' \'Iris-versicolor\' \'Iris-virginica\']\\", \\"n_classes_\\": 3, \\"_le\\": {\\"classes_\\": \\"[\'Iris-setosa\' \'Iris-versicolor\' \'Iris-virginica\']\\"}, \\"_features_count\\": 4, \\"name\\": \\"xgboost.sklearn.XGBClassifier\\"}","pipelineType":"sklearn","pipelineIndex":null,"orderId":0}]},{"modelId":null,"name":"生成Pipeline_XGBoost","description":"Empty","orderId":6,"stepTransformer":[]}]'
    const rowcol = [
      {
        acc: 0.9,
        名字: [<Tooltip key={1} title='111111111111111111111111'>12345678901234567890</Tooltip>, 0.1],
        aa: ['lili', 0.12345678901234567890],  b: 'lili',  c: 'lili',  d: 'lili',
      },
      {__title__: '概述', acc: 0.9, 名字: 'lili'},
      {__title__: '概述', acc: 0.9, 名字: 'lili'},
      {__title__: '概述', acc: 0.9, 名字: 'lili'},
      {__title__: '概述', acc: 0.9, 名字: 'lili'},
      {__title__: '概述', acc: 0.9, 名字: 'lili'},
      {__title__: '概述', acc: 0.9, 名字: 'lili'},
    ];
    const Threshold = '阈值计算';
    const IsolatedForests = '孤立森林';
    const IFException = '孤立森林异常点';
    const THException = '阈值计算异常点';
   const legendExtend = (modelTypes) => (_, legendTitles = []) => {
      const titles = [...legendTitles];
      if (modelTypes.indexOf(Threshold) !== -1 && !titles.find(item => item.alias === THException)) {
        titles.push({ alias: THException, color: 'red' });
      }
      if (modelTypes.indexOf(IsolatedForests) !== -1 && !titles.find(item => item.alias === IFException)) {
        titles.push({ alias: IFException, color: 'purple' });
      }
      return titles;
    };
   const isolatedForestsScales = (y = 'y', alias) => {
      return {
        scales: {
          axisX: { key: 'x', mask: 'HH:mm:ss' },
          axisY: [
            { key: y,
              alias,
              color: ['y*prediction', (val1, val2) => { return thresholdColor(`0_${val2}`); }],
              shape: 'circle',
              type: 'point' },
          ],
        },
      };
    };
   const thresholdColor = (() => {
      const obj = { 0: 'green', 1: 'red', '0_0': 'green', '0_1': 'purple', '1_0': 'red', '1_1': 'red' };
      return (key) => {
        return obj[key] || 'transparent';
      };
    })();
   const modelPerformance = JSON.parse(data.modelPerformance);
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>

        <ZetModal
          visible={this.state.visible}
          fullScreen
          footer={false}
          title='sss'
          onChangeSize={this.onChangeSize}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          icon={arr}
        >
          <ModelDetail
            links={[
              {id: 'overview', title: '概述'},
              {id: 'pipeline', title: 'pipeline'},
              {id: 'report', title: 'report'},
              {id: 'compare', title: 'compare'},
              {id: 'attachment', title: 'attachment'},
              ]}
          >
            <RowCol id='overview' title='overview' data={rowcol} />
            <h3 id="pipeline">pipeline</h3>
            <PipeLine data={JSON.parse(pipeline)} />
            <h3 id="report">report</h3>
            <BarChart1 data={data.plotChartData} />
            <SliderChart
              data={JSON.parse(data.sliderData)}
              height={360}
              scales={isolatedForestsScales('y', 'aaa').scales}
              options={{
                legendExtend: legendExtend(IsolatedForests),
              }}
            />
            <Rect5 data={data.featureImportance} windowStatus={windowStatus} />
            (
              <Tabs defaultActiveKey='roc_curve'>
                {modelPerformance.roc_curve
                && Object.keys(modelPerformance.roc_curve).length > 0
                && (
                  <TabPane tab='ROC' key='roc_curve'>
                    <div style={{ marginBottom: 24 }}>
                      <Roc
                        data={modelPerformance.roc_curve}
                        height={400}
                        windowStatus={windowStatus}
                      />
                    </div>
                  </TabPane>
                )
                }
                {modelPerformance.precision_recall_curve && (
                  <TabPane tab='Recall' key='precision_recall_curve'>
                    <Line xname='x' yname='y' xAlias='ceshiyi' yAlias='ceshier' data={modelPerformance.precision_recall_curve} windowStatus={windowStatus} />
                  </TabPane>
                )}
                  {modelPerformance.lift_curve && (
                  <TabPane tab='Lift' key='lift_curve'>
                    <Line xname='Percentage of sample' yname='Lift' data={modelPerformance.lift_curve} windowStatus={windowStatus} />
                  </TabPane>
                )}
                {modelPerformance.ks_curve && (
                  <TabPane tab='K-S' key='ks_curve'>
                    <div>{modelPerformance.ks_curve.ks}</div>
                    <Line2 data={modelPerformance.ks_curve} windowStatus={windowStatus} />
                  </TabPane>
                )}
                {modelPerformance.gain_curve && (
                  <TabPane tab='Gain' key='gain_curve'>
                    <Line xname='Percentage of sample' yname='Gain' data={modelPerformance.gain_curve} windowStatus={windowStatus} />
                  </TabPane>
                )}
              </Tabs>
            )
            }
            {modelPerformance.confusion_matrix && (
                <Matrix matrixdata={modelPerformance.confusion_matrix} />
            )}
            <h3 id="compare">compare</h3>
            <CompareCharts
              windowStatus={windowStatus}
              compareCharts={JSON.parse(data.compareCharts)}
              compareChartsType={JSON.parse(data.compareChartsType)}
              compareChartsModels={JSON.parse(data.compareChartsModels)}
              compareChartsModels1={JSON.parse(data.compareChartsModels1)}
              currentJob={data.currentJob}
            />
            <CompareTable dataCompare={JSON.parse(data.dataCompare)} currentJob={data.currentJob} />
            <h3>pipeline</h3>
            <h3>pipeline</h3>
            <h3>pipeline</h3>
            <h3>pipeline</h3>
            <h3>pipeline</h3>
            <h3>pipeline</h3>
            <h3>pipeline</h3>
            <h3>pipeline</h3>
            <h3>pipeline</h3>
            <h3>pipeline</h3>
            <h3>pipeline</h3>
            <h3>pipeline</h3>
            <h3>pipeline</h3>
            <h3>pipeline</h3>
            <h3 id="report">report</h3>
            <h3 id="attachment" >attachment</h3>
          </ModelDetail>
        </ZetModal>
      </div>
    );
  }
}

export default Demo;
