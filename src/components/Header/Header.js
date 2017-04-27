import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export const Header = () => (
  <div className="Header">
    <h1>Here is the space I created</h1>

    <Menu mode="horizontal">
      <Menu.Item key="home">
        <IndexLink to='/' activeClassName='route--active'>
          <Icon type="mail" />Home
        </IndexLink>
      </Menu.Item>

      <Menu.Item key="blog">
        <Link to='/blog' activeClassName='route--active'>
          <Icon type="mail" />Blog
        </Link>
      </Menu.Item>

      <SubMenu title={<span><Icon type="setting" />example</span>}>
        <MenuItemGroup title="一些数据流">
          <Menu.Item key="setting:1">
            <Link to='/counter' activeClassName='route--active'>
              Counter
            </Link>
          </Menu.Item>
          <Menu.Item key="setting:2">
            <Link to='/zen' activeClassName='route--active'>
              Zen
            </Link>
          </Menu.Item>
          <Menu.Item key="setting:3">
            <Link to='/elapse' activeClassName='route--active'>
              Elapse
            </Link>
          </Menu.Item>
        </MenuItemGroup>

        <MenuItemGroup title="其他页面">
          <Menu.Item key="setting:4">
            <Link to='/route/88' activeClassName='route--active'>
              Route
            </Link>
          </Menu.Item>
          <Menu.Item key="setting:5">
            <Link to='/notFound' activeClassName='route--active'>
              404
            </Link>
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu>

      <Menu.Item key="about" disabled>
        <IndexLink to='/about' activeClassName='route--active'>
          <Icon type="appstore" />About
        </IndexLink>
      </Menu.Item>

      <Menu.Item key="alipay">
        <a href="https://github.com/edwardxyt" target="_blank" rel="noopener noreferrer">My github</a>
      </Menu.Item>
    </Menu>
  </div>
)

export default Header
