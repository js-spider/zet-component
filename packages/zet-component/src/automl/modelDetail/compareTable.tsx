import React, { Component } from 'react';
import { Table, Checkbox } from 'antd';

export interface CompareTableProps {
  dataCompare: DataCompareProps;
  currentJob: string;
}

export interface DataCompareProps {
  params?: any[];
  models?: any[];
  sameParamsName?: string;
}

class CompareTable extends Component<CompareTableProps, any> {
  state = {
    checked: false,
  };

  onChange = (e) => {
    this.setState({
      checked: e.target.checked,
    });
  }

  render() {
    const { dataCompare, currentJob } = this.props;
    const { checked } = this.state;
    const compareTable = [];
    if (dataCompare.params && dataCompare.sameParamsName) {
      Object.keys(dataCompare.params).forEach(dc => {
        if (!checked || dataCompare.sameParamsName.indexOf(dc) < 0) {
          compareTable.push({ type: dc, ...dataCompare.params[dc] });
        }
      });
    }
    const AfterColumns = dataCompare.models
      ? dataCompare.models.map(dcm => ({
        title: currentJob === dcm.jobId ? <span style={{ color: 'red' }}>{dcm.jobName}</span> : dcm.jobName,
        // title: dcm.name,
        dataIndex: dcm.modelId,
      })) : [];

    const columns = [
      {
        title: <Checkbox checked={checked} onChange={this.onChange}>隐藏相同项</Checkbox>,
        dataIndex: 'type',
      },
      ...AfterColumns,
    ];
    return (
      <Table dataSource={compareTable} columns={columns} pagination={false} />
    );
  }
}

export default CompareTable;
