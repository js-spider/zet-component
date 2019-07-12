import React from "react";
import { Layout } from "antd";
import List from "./list";
import { LocaleReceiverHoc, TensileHoc } from "../../utils/hoc";
import Detail from './detail';
import Item from "./item";
import Collapse from "./collapse";
import "./index.less";

const { Content, Sider, Footer } = Layout;

interface ValueItemSchema {
  /** 算法Id */
  id: string;
  /** 算法名称 */
  name: string;
  checked?: boolean;
  /** 参数选项 */
  params: any[];
}

interface DerivativeProps {
  /** 算法配置列表 */
  data: any[];
  collapseData: object;
  /** 算法组件value */
  value?: ValueItemSchema[];
  /** 当前内容是否禁用 */
  disabled: boolean;
  derivationPreviewData?: any[];
  /** 数据内容发生变化回调 */
  onChange?: (value: ValueItemSchema[]) => void;
  preview?: (contentValue: any) => void;
}
interface DerivativeState {
  currentId: string;
  tableScrollHeight:number | string;
}

class Derivative extends React.Component<DerivativeProps, DerivativeState> {
  static Detail: typeof Detail;
  constructor(props) {
    super(props);
    this.state = {
      currentId: '',
      tableScrollHeight:undefined,
    };
  }
  componentDidMount() {
    const currentData = this.props.data[0];
    currentData && this.setState({
      currentId: currentData.id,
    });
  }
  onListChange = item => {
    const { currentId } = this.state;
    item && item.id !== currentId && this.setState({
      currentId: item.id,
    });
  }
  onSwitchChange = (checked, data) => {
    const { value } = this.props;
    let newValue = [];
    if (value.length > 0) {
      newValue = value.map(item => {
        if (item.id === data.id) {
          item.checked = checked;
        }
        return item;
      });
    } else {
      newValue = [{
        id: data.id,
        checked,
        params: [],
      }];
    }
    this.props.onChange(newValue);
  }

  onSelectedChange = (data) => {
    const {value} = this.props;
    const newValue = value.map(item => {
      if (item.id === data.id) {
        item.params = data.params;
      }
      return item;
    });
    this.props.onChange(newValue);
  }
  preview = () => {
    const { value } = this.props;
    this.props.preview(value);
  }
  tableScrollHeightHandle = (value)=>{
    if(value){
      const resultHeight = value.resultHeight;
      const tableHeight = resultHeight - 70;
      this.setState({
        tableScrollHeight:tableHeight
      })
    }
  }
  render() {
    const {data, collapseData, disabled = false, value = [], derivationPreviewData} = this.props;
    const { currentId, tableScrollHeight } = this.state;
    const contentData = data.find((item) => (item.id === currentId)) || {params: []};
    const contentValue = value.find((item) => (item.id === currentId)) || {id: '', params: []};
    const collapseDisable = value.find(item=>(item.params.length>0 && item.checked))
    return (
      <Layout className={'derivative-wraper'}>
        <Layout className={"alg-layout derivative"}>
          <Sider theme="light" width={240}>
            <p className={"sider-title"}>特征衍生策略</p>
            {data && (
              <List
                disabled={disabled}
                data={data}
                value={value}
                onChange={this.onListChange}
                onSwitchChange={this.onSwitchChange}
              />
            )}
          </Sider>
          <Content className={"alg-content"}>
            <div className={'derivative-content'}>
              <Item
                mess={contentData.desc}
                data={contentData.params}
                value={contentValue}
                onChange={this.onSelectedChange}
              />
            </div>
          </Content>
        </Layout>
        <Footer className={'derivative-footer'} id='derivativeFooter'>
          <TensileHoc targetId='derivativeFooter' min={130} onChange={this.tableScrollHeightHandle}></TensileHoc>
          <Collapse disabled={!collapseDisable} 
            data={collapseData} 
            preview={this.preview} 
            tableScrollHeight={tableScrollHeight}
            derivationPreviewData={derivationPreviewData}/>
        </Footer>
      </Layout>
    );
  }
}

export default LocaleReceiverHoc("AutoML")(Derivative);
