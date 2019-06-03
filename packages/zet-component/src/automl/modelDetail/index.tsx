import React from "react";
import { Anchor, Tooltip } from "antd";
import moment from "moment";

import MetricsConfig from "../config/metrics";
import { LocaleReceiverHoc } from "../../utils/hoc";
import './index.less';

const { Link } = Anchor;

export interface ModelDetailProps {
  links: any[];
}

class ModelDetail extends React.Component<ModelDetailProps, any> {
  constructor(props: ModelDetailProps) {
    super(props);
  }
  render() {
    const { links, children } = this.props;
    return (
      <div className={'listDetail'} id='detail'>
        <div className={'listDetail-content'}>
          <div style={{ width: '112px' }} className={'listDetailContentleft'} id='zetLeft'>
            <Anchor getContainer={() => document.getElementById('zetRight')}>
              {
                links.map(v => {
                  return <Link key={v.id} href={'#' + v.id} title={v.title} />;
                })
              }
              {/*<Link href="#overview" title='overview' />*/}
              {/*<Link href="#pipeline" title="Pipeline" />*/}
              {/*<Link href="#report" title='report' />*/}
              {/*<Link href="#compare" title='modelcompare' />*/}
              {/*<Link href="#attachment" title='attachment' />*/}
            </Anchor>
          </div>
          <div className={'listDetailContentright'} id='zetRight'>
            {children}
          </div>
      </div>
    </div>
    );
  }
}

export default LocaleReceiverHoc("AutoML")(ModelDetail);
