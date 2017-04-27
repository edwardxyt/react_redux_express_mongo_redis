import React, {Component} from 'react'
import { Row, Col, Card, Timeline} from 'antd';

const style = {
  'color': 'white',
  'fontSize': '18px'
};


export default class Elapse extends Component {
  constructor(props) {
      super(props);
      // this.state = {};
      // this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    elapse: React.PropTypes.number.isRequired,
    plus: React.PropTypes.func.isRequired
  }


  componentDidMount () {
    this.interval = setInterval(this.props.plus, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const {elapse} = this.props
    return (
      <div>
        <Row gutter={48}>
          <Col span={16} push={8}>
            <Timeline>
              <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item color="red">
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </Timeline.Item>
            </Timeline>
          </Col>
          <Col span={8} pull={16}>
            <Card bodyStyle={{ padding: 0 }} style={{ marginBottom: 16 }}>
              <div className="custom-image">
                <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
              </div>
              <div className="custom-card">
                <h3>Europe Street beat</h3>
                <p>www.instagram.com</p>
              </div>
            </Card>

            <Card title={elapse} extra={<a href="#">More</a>}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <p className="footer">联系方式 | ruanyifeng.com 2003 - 2017  Site Meter</p>
          </Col>
        </Row>
    </div>
    )
  }
}
