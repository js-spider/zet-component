import React from "react";
import { Anchor } from "antd";
import { LocaleReceiverHoc } from "../../utils/hoc";
import './index.less';

const { Link } = Anchor;

export interface DetailProps {
  links: any[];
}

class Detail extends React.Component<DetailProps, any> {
  constructor(props: DetailProps) {
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

export default Detail;
