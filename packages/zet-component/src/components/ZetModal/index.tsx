import * as React from "react";
import { Modal } from 'antd';
import ZetIcon from '../ZetIcon';
import styles from './index.module.less';

export interface ZetModalProps {
  fullScreen?: boolean;
  onChangeSize?: (param: string) => any;
  icon?: React.ReactNode[];
  className?: string;
  id?: string;
  title?: any;
  onCancel?: any;
  children?: any;
  footer?: any;
  visible: boolean;
}

class ZetModal extends React.PureComponent<ZetModalProps, any> {

  static defaultProps = {
    onChangeSize: () => { },
    title: '数据预览',
  };

  state = {
    modalWidth: '960px',  // noraml
    fullScreenName: false, // 切换 全屏/正常 的状态
    transIcon: 'zeticon-arrows-alt',
  };

  constructor(props: ZetModalProps) {
    super(props);
  }

  onCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      modalWidth: '960px',
      fullScreenName: '',
    });
    onCancel();
  }

  // 模态框最大化
  maximizeModal = () => {
    const { onChangeSize } = this.props;
    this.setState({
      modalWidth: '100%',
      fullScreenName: true,
      transIcon: 'zeticon-shrink',
    }, () => { onChangeSize('fullscreen'); });
  }

  minimizeModal = () => {
    const { onChangeSize } = this.props;
    this.setState({
      modalWidth: '960px',
      fullScreenName: '',
      transIcon: 'zeticon-arrows-alt',
    }, () => { onChangeSize('normal'); });
  }

  render() {
    const { modalWidth, transIcon, fullScreenName } = this.state;
    const { className, title, fullScreen, children, id, footer, icon, visible, ...otherProps } = this.props;
    const classNames = `${styles.zetmodel} ${styles.zetModal} ${fullScreenName && `${styles.fullScreen}`} ${className}`;
    return (
      <Modal
        {...otherProps}
        visible={visible}
        onCancel={this.onCancel}
        maskClosable={false}

        title={
          (
            <div className={styles.modalTitle}>
              {title}
              {
                icon
              }
              {fullScreenName && (
                <ZetIcon
                  type="zeticon-shrink"
                  onClick={this.minimizeModal}
                  // onKeyDown={this.minimizeModal}
                  key='minimize'
                  role='button'
                  className={styles.modalMinSize}
                />)
              }
              {fullScreen && !fullScreenName && (
                <ZetIcon
                  type={transIcon}
                  onClick={this.maximizeModal}
                  // onKeyDown={this.maximizeModal}
                  key='maximize'
                  role='button'
                  // tabIndex='0'
                  className={styles.modalMinSize}
                />)
              }
            </div>
          )
        }
        width={modalWidth}
        // id='fullScreen'
        className={classNames}
        footer={footer}
      >
        <div id={id || 'zetmodal'} style={{ height: '100%' }}>
          {children}
        </div>
      </Modal>
    );
  }
}

export default ZetModal;
