import React, {Component} from 'react'
import PropTypes from 'prop-types'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

import createG2 from 'g2-react';
import {Stat} from 'g2';
import data from '../modules/data.json';

class HigherChart extends Component {

  constructor(props, ...others) {
    super(props, ...others);
    this.Chart = createG2(chart => {
      this.chart = chart;
      chart.line().position('time*price').color('name').shape(props.shape).size(2);
      chart.render();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shape !== this.props.shape) {
      this.chart.clear();
      this.chart.line().position('time*price').color('name').shape(nextProps.shape).size(2);
      this.chart.render();
    }
  }

  render() {
    return (<this.Chart {...this.props}/>);
  }
}

class MyComponent extends Component {
  state = {
    shape: 'spline',
    data: data.slice(0, data.length / 2 - 1),
    width: 500,
    height: 250,
    plotCfg: {
      margin: [10, 100, 50, 120]
    }
  }
  changeHandler = () => {
    this.setState({shape: 'line'});
  }
  render() {
    return <div>
      <HigherChart shape={this.state.shape} data={this.state.data} width={this.state.width} height={this.state.height} plotCfg={this.state.plotCfg}/>
      <button onClick={this.changeHandler}>Change shape</button>
    </div>
  }
}

export default class HomeView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {}

  shouldComponentUpdate() {
    return true
  }

  render() {
    return (
      <div className="HomeView">
        <h4>Welcome!</h4>
        <img alt='This is a duck, because Redux!' className='duck' src={DuckImage}/>
        <MyComponent/>
      </div>
    )
  }
}

// export const HomeView = () => (
//   <div className="HomeView">
//     <h4>Welcome!</h4>
//     <img alt='This is a duck, because Redux!' className='duck' src={DuckImage}/>
//   </div>
// )
//
// export default HomeView
