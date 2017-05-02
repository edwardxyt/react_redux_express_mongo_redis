import React, { Component } from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'

import { Breadcrumb, BackTop } from 'antd';

// 无状态组件一般会搭配高阶组件（简称：HoC）一起使用，高阶组件用来托管state，Redux 框架就是通过 store 管理数据源和所有状态，其中所有负责展示的组件都使用无状态函数式的写法。
// export const CoreLayout = (props) => (
//   <div className='CoreLayout container text-center'>
//     <Header />
//     <Breadcrumb style={{height: '48px', lineHeight: '48px'}} routes={props.routes} params={props.params} separator="/" />
//     <div className='core-layout__viewport'>
//       {props.children}
//     </div>
//     <BackTop />
//   </div>
// )
//
// CoreLayout.propTypes = {
//   children: React.PropTypes.element.isRequired
// }
//
// export default CoreLayout

// React.Component 另一种写法
export class CoreLayout extends Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired
  }

  shouldComponentUpdate () {
    return true
  }

  render () {
    const props = this.props
    // console.log(props);
    // 此时的routes 不是传进来的了 注意是router index.js里分配来的
    return (
      <div className='CoreLayout container text-center'>
        <Header />
        <Breadcrumb style={{height: '48px', lineHeight: '48px'}} routes={props.routes} params={props.params} separator="/" />
        <div className='core-layout__viewport'>
          {props.children}
        </div>
        <BackTop />
      </div>
    )
  }
}
