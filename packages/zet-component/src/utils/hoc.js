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