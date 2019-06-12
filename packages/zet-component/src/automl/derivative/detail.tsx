import React from "react";
import { Modal, Table } from "antd";

interface Props {
  visible: boolean;
  data: any[];
  handleCancel?: () => void;
}
interface State {}

const getColumns = () => {
  return [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: "字段名",
      dataIndex: "field",
      key: "field",
      align: "center",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      align: "center",
    },
  ];
};
const getDataSource = data => {
  if (Array.isArray(data)) {
    return data.map((item, index) => {
      return {
        index,
        field: item.name,
        type: item.age,
      };
    });
  }
  return [];
};

class DerivativeDetail extends React.Component<Props, State> {
  hideModal = () => {};
  render() {
    const { visible, handleCancel, data, ...otherProps } = this.props;
    const columns = getColumns();
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
          dataSource={dataSource}
          columns={columns}
          scroll={{ y: 400 }}
          pagination={false}
        />
      </Modal>
    );
  }
}
export default DerivativeDetail;
