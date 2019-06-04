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
    },
    {
      title: "字段名",
      dataIndex: "field",
      key: "field",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
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
  hideModal = () => {

  }
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
        <Table dataSource={dataSource} columns={columns} />
      </Modal>
    );
  }
}
export default DerivativeDetail;
