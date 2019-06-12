import React, { PureComponent } from 'react';
import { Row, Col, Popover } from 'antd';
import ArrowPNG from '../../assets/arrow.png';
import ArrowPNG2 from '../../assets/arrow2.png';
import './index.less';
export interface PipelineProps {
  data: any[];
}

function Popovercontent(props) {
  return (
    <div style={{ zIndex: 1010, width: 500, height: 300, overflowY: 'auto' }}>
      {props.data.map(d => (
        <p key={d.orderId}>{d.transformer}</p>
      ))}
    </div>
  );
}

function PipeLineNode(props) {
  return (
    <Popover placement="bottom" content={<Popovercontent data={props.data.stepTransformer} />} title={props.data.name}>
      <Col span={3} className={'pipelinebox'}>{props.data.name}</Col>
    </Popover>
  );
}

function Arrow(props) {
  return (
    <Col span={4} className={props.reverse ? 'pipelinearrows' : 'pipelinearrow'}>
      <img src={ArrowPNG} alt="ArrowPNG" />
    </Col>
  );
}

function BottomArrow(props) {
  if (props.right) {
    return (
      <Row>
        <Col span={21} />
        <Col span={3} className={'pipelinearrowr'}>
          <img src={ArrowPNG2} alt="ArrowPNG2" />
        </Col>
      </Row>
    );
  }
  return (
    <Row>
      <Col span={3} className={'pipelinearrowr'}>
        <img src={ArrowPNG2} alt="ArrowPNG2" />
      </Col>
      <Col span={21} />
    </Row>
  );
}

function NodeRow(props) {
  const result = [];
  const length = (props.data.length - (props.index - 1) * 4) < 4
    ? props.data.length - (props.index - 1) * 4 : 4;
  for (let i = 1; i <= length; i++) {
    if (props.reverse) {
      if (i === 1) {
        result.unshift(<PipeLineNode data={props.data[(props.index - 1) * 4 + i - 1]} />);
      } else {
        result.unshift(<Arrow reverse={true} />);
        result.unshift(<PipeLineNode data={props.data[(props.index - 1) * 4 + i - 1]} />);
      }
    } else if (i === 1) {
      result.push(<PipeLineNode data={props.data[(props.index - 1) * 4 + i - 1]} />);
    } else {
      result.push(<Arrow />);
      result.push(<PipeLineNode data={props.data[(props.index - 1) * 4 + i - 1]} />);
    }
  }
  if (props.reverse) {
    if (length < 4) {
      result.unshift(<Col span={(4 - length) * 3 + (4 - length) * 4} />);
    }
  }
  return (
    <Row>
      {result}
    </Row>
  );
}

class PipeLine extends PureComponent<PipelineProps, any> {
  render() {
    const { data } = this.props;
    const totalNode = [];
    for (let i = 1; i <= Math.ceil(data.length / 4); i++) {
      if (i % 2 === 0) {
        totalNode.push(<BottomArrow right={true} />);
      }
      if (i > 1 && i % 2 !== 0) {
        totalNode.push(<BottomArrow />);
      }
      totalNode.push(<NodeRow index={i} reverse={i % 2 === 0} data={data} />);
    }
    return (
      <div>
        {totalNode}
      </div>
    );
  }
}

export default PipeLine;
