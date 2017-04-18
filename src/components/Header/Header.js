import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import { Button } from 'antd';

export const Header = () => (
  <div className="Header">
    <Button type="danger">Danger</Button>
    <h1>在React Starter Kit ---- <a href='' target='_blank'>bodyno</a></h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='route--active'>
      Counter
    </Link>
    {' · '}
    <Link to='/zen' activeClassName='route--active'>
      Zen
    </Link>
    {' · '}
    <Link to='/elapse' activeClassName='route--active'>
      Elapse
    </Link>
    {' · '}
    <Link to='/route/88' activeClassName='route--active'>
      Route
    </Link>
    {' · '}
    <Link to='/notFound' activeClassName='route--active'>
      404
    </Link>
  </div>
)

export default Header
