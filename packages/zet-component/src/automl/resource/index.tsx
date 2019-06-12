import React from "react";
import { Row, Col } from "antd";
import { getResourceTypes, defaultResourceType } from "../../utils/utils";
import Resource from "../../components/resource";
import { FormResourcesHoc } from "../../utils/hoc";

const { ResourceGroup } = Resource;

interface Props {
  groupConfig: any;
  authRead: any;
  standalone: any;
  userResource: any;
  form?: any;
}

class Resources extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { groupConfig, authRead, standalone, userResource } = this.props;

    const types = getResourceTypes(userResource);
    return (
      <div style={{ padding: 40 }}>
        {groupConfig.map(conf => {
          const item = conf.key;
          const itemContent = conf.itemContent || defaultResourceType;
          return (
            <ResourceGroup disabled={authRead} title={conf.title} key={item}>
              <Row>
                {["cpu", "mem", "gpu"].map(it => {
                  return (
                    standalone[item][it] !== undefined &&
                    itemContent.includes(it) && (
                      <Col span={8} key={it}>
                        {getFieldDecorator(`${item}_${it}`, {
                          initialValue: standalone[item][it],
                        })(<Resource {...types[it]} />)}
                      </Col>
                    )
                  );
                })}
              </Row>
            </ResourceGroup>
          );
        })}
      </div>
    );
  }
}
export default FormResourcesHoc(Resources);
