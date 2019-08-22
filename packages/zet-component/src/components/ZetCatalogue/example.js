import React, { Component } from 'react';
import ZetCatalogue from '.';

class Demo extends Component {
  render (){
    const data = ['分析模块','分析模块','分析模块','分析模块','分析模块','分析模块','分析模块','分析模块','分析模块','分析模块','分析模块','分析模块','分析模块','分析模块','分析模块']
    return(
     <div>
       <ZetCatalogue data={data} x={5} />
     </div>
    );
  }
}
export default Demo;
