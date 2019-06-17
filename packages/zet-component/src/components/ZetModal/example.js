import React, { Component } from 'react';
import ZetModal from '.';
import { Button, Icon } from 'antd';
import ZetIcon from '../ZetIcon';

class Demo extends Component {
  state = {
    visible: false
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  onChangeSize = () => {
    console.log('callback');
  }
  render() {
    const arr = [
      <span>
        <Icon type="step-backward" />
        <Icon type="step-forward" />
      </span>
    ]
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>

        <ZetModal
          visible={this.state.visible}
          fullScreen
          footer={false}
          title='sss'
          onChangeSize={this.onChangeSize}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          icon={arr}
        >
        </ZetModal>
      </div>
    );
  }
}

export default Demo;
