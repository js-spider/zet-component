import React from "react";
import { Anchor, List as List_ } from "antd";
import { LocaleReceiverHoc } from "../../utils/hoc";
import './index.less';

const { Link } = Anchor;

export interface ListProps {
  data: DataProps[];
}
export interface DataProps {
  name?: string;
  value?: string;
}

class List extends React.Component<ListProps, any> {
  constructor(props: ListProps) {
    super(props);
  }
  render() {
    const { data } = this.props;
    return (
      <div className={'box'}>
        <List_
          dataSource={data}
          renderItem={d => (
            <List_.Item>
              <List_.Item.Meta style={{ float: 'left' }} title={d.name} />
              <div style={{ float: 'right' }}>{d.value}</div>
            </List_.Item>
          )}
        />
      </div>
    );
  }
}

export default List;
