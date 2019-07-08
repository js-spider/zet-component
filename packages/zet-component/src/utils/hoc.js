import React from "react";
import { Form } from 'antd';
import { LocaleProvider } from "../index";
import { convertMem,defaultResourceType } from './utils.js';
import LocaleReceiver from "../components/locale-provider/localeReceiver";

/**
   中英文 LocaleProvider hoc
*/
export const LocaleProviderHoc = WrappedComponent => {
  class HocComponent extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        currLocale: "zh_CH",
      };
    }
    clickHandle = () => {
      this.setState({
        currLocale: this.state.currLocale === "en_US" ? "zh_CH" : "en_US",
      });
    }
    render() {
      const { currLocale } = this.state;
      return (
        <LocaleProvider locale={currLocale}>
          <div>
            <p style={{ textAlign: "right" }}>
              中英文切换 :{" "}
              <a onClick={this.clickHandle}>
                {currLocale === "en_US" ? "中文" : "英文"}
              </a>
            </p>
            {WrappedComponent}
          </div>
        </LocaleProvider>
      );
    }
  }
  return <HocComponent />;
};

/**
   中英文 LocaleProvider hoc
*/

export const LocaleReceiverHoc = componentName => WrappedComponent => {
  return class HocComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        lcoale: {},
      };
    }
    render() {
      const { lcoale } = this.state;
      return (
        <LocaleReceiver componentName={componentName}>
          {(locale) => <WrappedComponent {...this.props} intl={locale} />}
        </LocaleReceiver>
      );
    }
  };
};

/**
 *  resource Form
 */

export const FormResourcesHoc = WrappedComponent => {
  class HocComponent extends React.Component{
    render(){
      return (
        <WrappedComponent {...this.props} form={this.props.form} ></WrappedComponent>   
      )
    }
  }
  return Form.create({
    mapPropsToFields(props) {
      const { standalone, groupConfig } = props;
      const result = {};
      let itemName,itemContent;
      groupConfig.forEach(conf=>{
        itemName = conf.key;
        itemContent = conf.itemContent || defaultResourceType;
        itemContent.includes('mem') && (result[`${itemName}_mem`] = Form.createFormField({ value: convertMem(standalone[itemName].mem) }))
        itemContent.includes('cpu') && (result[`${itemName}_cpu`] = Form.createFormField({ value: standalone[itemName].cpu }))
        itemContent.includes('gpu') && (result[`${itemName}_gpu`] = Form.createFormField({ value: standalone[itemName].gpu }))
      })
      return result;
    },
    onValuesChange(props, _ , allValues){
      const { groupConfig } = props;
      const result = {};
      let itemName,itemContent;
      groupConfig.forEach(conf => {
        itemName = conf.key;
        itemContent = conf.itemContent || defaultResourceType;
        result[itemName] = {};
        itemContent.includes('mem') && (result[itemName].mem = allValues[`${itemName}_mem`]*1024)
        itemContent.includes('cpu') && (result[itemName].cpu = allValues[`${itemName}_cpu`])
        itemContent.includes('gpu') && (result[itemName].gpu = allValues[`${itemName}_gpu`])
      })
      props.onChange(result,props)
    }
  })(HocComponent)
};

/**
 * tensile hoc
 */
class Tensile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      clientY:{
        start:0,
        end:0,
      },
      clientX:{
        start:0,
        end:0,
      },
      mouseStatus:null,
      canTensile:false,
    };
    this.timer = null;
  }
  setClient = (mouseType,e)=>{
    let defaultClient = {...this.state};
    defaultClient.mouseStatus = mouseType;
    switch(mouseType){
      case 'down':
        defaultClient.clientX.start = e.clientX;
        defaultClient.clientY.start = e.clientY;
        defaultClient.clientX.end = e.clientX;
        defaultClient.clientY.end = e.clientY;
        defaultClient.canTensile = true;
        break;
      case 'move':
        console.log('client.clientY >>. ',e.clientY)
        defaultClient.clientX.end = e.clientX;
        defaultClient.clientY.end = e.clientY;
        break;
      case 'up':
        defaultClient.clientX.start = 0;
        defaultClient.clientY.start = 0;
        defaultClient.clientX.end = 0;
        defaultClient.clientY.end = 0;
        defaultClient.canTensile = false;
        break;
      default: null
    }
    this.setState({
      ...defaultClient
    })
  }
  mouseDownHandle=(e)=>{
    this.setClient('down',e)
  }
  mouseMoveHandle=(e)=>{
    const {canTensile} = this.state;
    const client = {clientY:e.clientY,clientX:e.clientX};
    if(e && canTensile){
      this.timer = this.timer || setTimeout(()=>{
        this.setClient('move',client);
        this.timer = null;
      },50)
    }
  }
  mouseUpHandle=(e)=>{
    this.setClient('up',e);
    this.timer = null;
  }
  render(){
    const {clientX,clientY} = this.state;
    console.log('clientXX >> ',clientX,clientY)
    const {style={},className,height,component,targetId,otherProps} = this.props;
    let hocStyle = Object.assign({},{ cursor:'move', backgroundColor:'red'},style,{height:height || 30})  
    const WrappedComponent = component
    const handel = {
      onMouseDown:this.mouseDownHandle, 
      onMouseMove:this.mouseMoveHandle,
      onMouseUp:this.mouseUpHandle
    }
    const target = targetId && document.getElementById(targetId);
    if(target){
      target.style.height = target.clientHeight + (clientY.start - clientY.end) + 'px';
      console.log('target.style.height >> ', target.style.height)
    }
    return (
      <React.Fragment>
       {WrappedComponent ? <WrappedComponent {...handel} props={otherProps}></WrappedComponent> : <div style={hocStyle} {...handel} props={otherProps} ></div>}
      </React.Fragment>
    )
  }
};
export const TensileHoc = Tensile;