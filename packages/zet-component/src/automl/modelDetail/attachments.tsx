import React from "react";
import { LocaleReceiverHoc } from "../../utils/hoc";
import './index.less';

export interface AttachmentsProps {
  data: DataProps[];
}

export interface DataProps {
  id: string;
  name: string;
  filePath: string;
}

class Attachments extends React.Component<AttachmentsProps, any> {
  constructor(props: AttachmentsProps) {
    super(props);
  }
  render() {
    const { data } = this.props;
    return (
      <div>
        {
         data.map(item => {
            return (
             <span key={item.id} style={{ marginBottom: 15, marginRight: 10 }}>
                <a target="_blank" href={item.filePath}>{item.name}</a>
             </span>
           );
         })
        }
      </div>
    );
  }
}

export default Attachments;
