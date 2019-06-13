import React, { Component } from 'react';
import { Select } from 'antd';
import CurveChart from '../../components/charts/curve';

const { Option } = Select;

class Roc extends Component {
  state = {
    current: undefined,
    selectList: [],

  }

  componentDidMount() {
    this.loaddata(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loaddata(nextProps);
  }

  loaddata = props => {
    const { data } = props;
    const selectList = [];
    for (const key of Object.keys(data)) {
      selectList.push(key);
    }
    this.setState({
      selectList,
      current: selectList[0],
    });
  }

  change = (value) => {
    this.setState({
      current: value,
    });
  }

  render() {
    const { selectList, current } = this.state;
    const { data, height, windowStatus } = this.props;
    return (
      <div style={{ width: '100%' }}>
        <div>
          <Select onChange={this.change} value={current} style={{ width: 300 }}>
            {selectList.map(o => <Option key={o} value={o}>{o}</Option>)}
          </Select>

          <span style={{ marginLeft: 24 }}>
            ROC AUC: {current && data[current].roc_auc}
          </span>
        </div>

        {current && (
          <CurveChart
            data={data[current].data}
            height={height}
            windowStatus={windowStatus}
          />
        )}
      </div>
    );
  }
}

export default Roc;
