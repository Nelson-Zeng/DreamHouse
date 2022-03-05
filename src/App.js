import React, {useEffect, useState} from 'react';
import './app.css';
import { Layout, Menu } from 'antd';
import route from './route/route';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import NotFound from './pages/notfound';

const { Sider } = Layout;
const { SubMenu } = Menu;

const App = () => {
  const [menuOpenedKeys, setMenuOpenedKeys] = useState([]);
  const [menuSelectedKeys, setMenuSelectedKeys] = useState([]);

  // 监听路径匹配菜单
  const {pathname} = useLocation();
  useEffect(() => {
    const keys = pathname.split('/').splice(1);
    try {
      const {path} = keys.reduce((total, cur) => {
        const index = total.arr.findIndex((item) => item.key === cur);
        if (index >= 0) {
          total.path.push(total.arr[index].key);
          if (total.arr[index].children) {
            total.arr = total.arr[index].children;
          }
          return total;
        } else {
          throw new Error('未匹配');
        }
      }, {
        arr: route,
        path: []
      });
      setMenuSelectedKeys(path.splice(path.length - 1));
      setMenuOpenedKeys(path);
    } catch (e) {
      console.log('err', e);
    }

  }, [pathname]);

  const onMenuClick = () => {
  };

  // 递归遍历配置，生成侧边栏
  const renderSide = (arr) => arr.map((item) => {
    if (item.children) {
      return (
        <SubMenu key={item.key} title={item.title}>
          {
            renderSide(item.children)
          }
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.key}>{item.title}</Menu.Item>
      );
    }
  });

  return (
    <Layout className='app'>
      <Sider>
        <div className='logo'>
          梦想家
        </div>
        <Menu
          onClick={onMenuClick}
          mode="inline"
          openKeys={menuOpenedKeys}
          selectedKeys={menuSelectedKeys}>
          {
            renderSide(route)
          }
        </Menu>
      </Sider>
      <Layout>
        <Routes>
          <Route exact path='/gameutils/eu4/wonders' />
          <Route exact path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default App;
