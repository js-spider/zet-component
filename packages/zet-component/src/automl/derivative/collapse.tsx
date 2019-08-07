import React from "react";
import { Table, Button } from "antd";
import { ColumnProps } from "antd/lib/table";
interface CollapseFooterProps {
  data: any;
  derivationPreviewData: any[];
  disabled?:boolean;
  tableScrollHeight?:number | string;
  preview: (cbk:any) => void;
}
interface CollapseFooterState {
  loading:any,
}

interface PreviewTable {
  title: string;
  render: () => React.ReactNode;
}

const messMap = data => {
  return (
    Array.isArray(data) &&
    data.map((item, index) => {
      return <p key={index}>{item}</p>;
    })
  );
};
const getAmount = (data = {}) => {
  const total = { sum: 0, numeric: 0, text: 0, time: 0 };
  Object.keys(data).forEach(item => {
    if (["numeric", "text", "time"].includes(item)) {
      if (Array.isArray(data[item])) {
        total.sum += data[item].length;
        total[item] = data[item].length;
      }
    }
  });
  return total;
};

class CollapseFooter extends React.Component<CollapseFooterProps,CollapseFooterState> {
  constructor(props){
    super(props);
    this.state = {
      loading:false
    }
  }

  preview = () => {
    this.setState({
      loading:true
    })
    this.props.preview(() => {
      this.setState({
        loading:false
      })
    })
  }
  render() {
    const { loading } = this.state;
    const { derivationPreviewData, disabled, tableScrollHeight= 170} = this.props;
    const columns: Array<ColumnProps<PreviewTable>> = [
      {
        title: "序号",
        dataIndex: "index",
        width: 200,
        align: 'center',
        render: (text, record, index) => {
          return index + 1;
        },
      },
      {
        title: "原始特征",
        dataIndex: "dependencies",
        align: 'center',
        width: 400,
        render: (text, record, index) => {
          return Array.isArray(text) ? text.join(',') : text;
        },
      },
      {
        title: "生成特征",
        dataIndex: "name",
        width: 400,
        align: 'center',
      },
      {
        title: "类型",
        align: 'center',
        width: 200,
        dataIndex: "variableType",
        render: (text, record, index) => {
          switch (text) {
            case 'numeric':
              return '数值型';
            case 'datetime':
              return '时间型';
            case 'text':
              return '文本型';
            default: '';
          }
        },
      },
    ];
    return (
      <React.Fragment>
        <div className={"footer-tile"}>
          <span style={{lineHeight: '32px'}}>
            {`衍生特征 (${derivationPreviewData ? derivationPreviewData.length : 0})`}
          </span>
          <Button
            disabled={disabled}
            onClick={this.preview}
            style={{
              color: '#fff',
              float: "right",
              backgroundColor: '#1976d2',
            }}
            loading={ loading }
          >
            生成
          </Button>
        </div>
        <div style={{height: tableScrollHeight }} className={"footer-table"}>
          <Table
            columns={columns}
            dataSource={disabled ? [] : derivationPreviewData}
            pagination={false}
            // scroll={{y: tableScrollHeight}}
          />
        </div>

      </React.Fragment>
    );
  }
}

export default CollapseFooter;
