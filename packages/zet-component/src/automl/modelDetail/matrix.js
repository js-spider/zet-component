import React, { PureComponent } from 'react';
import { Table } from 'antd';

class Matrix extends PureComponent {
  state = {
    classlist: [],
    data: [],
  }

  componentDidMount() {
    this.loaddata(this.props);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.detailres !== this.props.detailres) {
  //     this.loaddata(nextProps);
  //   }
  // }

  loaddata = props => {
    const { matrixdata } = props;
    const src = matrixdata.confusion_matrix.PredictedActual;
    const classlist = [];
    const data = [];
    for (const key of Object.keys(src)) {
      classlist.push(key);
      data.push({ actual: key, ...src[key].per_predicted });
    }
    this.setState({
      classlist,
      data,
    });
  }

  render() {
    const { classlist, data } = this.state;
    const columns = [
      {
        title: '',
        children: [
          {
            title: '实际',
            dataIndex: 'actual',
            key: 'actual',
          },
        ],
      },
      {
        title: '预测',
        children: [
        ],
      },
    ];
    columns[1].children = classlist.map(item => ({
      title: item,
      dataIndex: item,
      key: item,
      render: (text, record) => {
        if (record.actual === item) {
          return (
            <div style={{ color: 'green' }}>
              { Math.round(text * 10000) / 10000 }
            </div>
          );
        }
        return (
          <div style={{ color: 'red' }}>
            { Math.round(text * 10000) / 10000 }
          </div>
        );
      },
    }));

    return (
      <div style={{ width: '100%' }}>
        <Table
          columns={columns}
          dataSource={data}
          size='small'
          bordered
          pagination={false}
          rowKey={record => record.actual}
        />
      </div>
    );
  }
}

export default Matrix;
