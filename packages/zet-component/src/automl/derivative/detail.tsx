import React from "react";
import { Modal, Table } from "antd";
import { ColumnProps } from "antd/lib/table";

interface Props {
  visible: boolean;
  data: any[];
  handleCancel?: () => void;
}
interface State {}

interface PreviewTable {}

const getDataSource = data => {
  if (Array.isArray(data)) {
    return data.map((item, index) => {
      return {
        index,
        field: item.name,
        type: item.type,
      };
    });
  }
  return [];
};

class DerivativeDetail extends React.Component<Props, State> {
  hideModal = () => {};
  render() {
    const { visible, handleCancel, data, ...otherProps } = this.props;
    const columns: Array<ColumnProps<PreviewTable>> = [
      {
        title: "序号",
        dataIndex: "index",
        width:200,
        align: 'center',
      },
      {
        title: "字段名",
        dataIndex: "field",
        width:400,
        align: 'center',
      },
      {
        title: "类型",
        dataIndex: "type",
        width:400,
        align: 'center',
      },
    ];
    const dataSource = getDataSource(data);
    return (
      <Modal
        title="模型特征"
        visible={visible}
        onCancel={handleCancel}
        {...otherProps}
      >
        <Table
          className={"detail-table"}
          columns={columns}
          dataSource={dataSource}
          scroll={{ y: 400 }}
          pagination={false}
        />
      </Modal>
    );
  }
}
export default DerivativeDetail;
