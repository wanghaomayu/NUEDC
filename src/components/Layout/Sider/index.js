import React from 'react'
import { Icon, Menu } from 'antd'
import { Link } from 'dva/router'
import { urlEncode, windowScroll } from '../../../utils'

const {SubMenu} = Menu
const Sider = ({menuConfig, location, query = {}}) => {
  const {menus = [], openKeys = [], defaultSelectedKeys = []} = menuConfig
  const renderMenus = menus => (
    menus.map(item => {
      const {subMenus = []} = item
      if (subMenus.length > 0) {
        return (
          <SubMenu key={item.key} title={<span><Icon type={item.icon} /> {item.value}</span>}>
            {renderMenus(subMenus)}
          </SubMenu>
        )
      }
      const queryString = item.route
        ? '?' + urlEncode(query[item.route] || {})
        : ''   //   为了Link的to接的是本页面的pathname + ？+ contest的id，即（item.key+queryString）
      return (
        <Menu.Item key={item.key}>
          <Link to={item.key + queryString}><Icon
            type={item.icon} /> {item.value}
          </Link>
        </Menu.Item>
      )
    })
  )
  return (
    <div style={{marginTop: 10}}>
      <Menu
        mode='inline'
        defaultSelectedKeys={[menus[0].key + '']}   //   defaultSelectedKeys要求的参数类型是string，故此处的" + '' "操作是强制类型转换
        defaultOpenKeys={openKeys}           //   当前展开的 SubMenu 菜单项 key 数组,即默认展开的SubMenu内容
        selectedKeys={[location.pathname]}   //   当前选中的菜单项key数组，就是sider列表的每一行的key值数组
        style={{height: '100%', borderRight: 0}}
        onClick={() => windowScroll('nav-header')}
      >
        {renderMenus(menus)}
      </Menu>
    </div>
  )
}

Sider.propTypes = {}
Sider.defaultProps = {}

export default Sider
