import React, {useEffect, useState} from 'react';
import './app.css';
import { Layout, Menu } from 'antd';
import route from './route/route';
import {
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import NotFound from './pages/notfound';
import request from './utils/request';

const { Sider, Header } = Layout;
const { SubMenu } = Menu;

const App = () => {
  (() => {
    request('', {needAuth: true});
  })();

  const navigate = useNavigate();

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
      // do nothing
    }

  }, [pathname]);

  // 处理导航点击事件
  const onMenuClick = (e) => {
    if (!e) {return;}
    const {key, domEvent} = e;
    const temp = [...menuSelectedKeys];
    if (!temp.includes(key)) {
      temp.push(key);
    } else {
      const index = temp.findIndex((item) => item === key);
      temp.splice(index);
    }
    setMenuSelectedKeys(temp);
    const {path} = domEvent.target.parentElement.dataset;
    navigate(path);
  };

  // 处理侧边栏展开/收起状态
  const onSubMenuClick = (e) => {
    const {key} = e;
    const temp = [...menuOpenedKeys];
    if (!temp.includes(key)) {
      temp.push(key);
    } else {
      const index = temp.findIndex((item) => item === key);
      temp.splice(index);
    }
    setMenuOpenedKeys(temp);
  };

  // 递归遍历配置，生成侧边栏
  const renderSide = (arr) => arr.map((item) => {
    if (item.children) {
      return (
        <SubMenu key={item.key} title={item.title} onTitleClick={onSubMenuClick}>
          {
            renderSide(item.children)
          }
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.key} data-path={item.path}>{item.title}</Menu.Item>
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
        <Header></Header>
        <Routes>
          <Route exact path='/gameutils/eu4/wonders' />
          <Route exact path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default App;
