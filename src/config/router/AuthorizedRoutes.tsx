import React, { useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFount from 'src/Components/NotFound/NotFount';
import { page } from 'src/constants/page';
import Static from 'src/Pages/Static';
import { logout } from 'src/Store/reducer/authReducer/authReducer';
import { userLoadingSelector } from 'src/Store/reducer/authReducer/authSelector';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';

const { Content, Sider } = Layout;

export default function AuthorizedRoutes() {
  const user = useSelector(userLoadingSelector);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  const isLogin = !isEmpty(user);

  // let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    <Navigate to="/login" state={{ from: location }} replace />;
  }, []);

  return (
    //   <Routes>
    //   <Route path={page.signIn} element={<SignIn />} />
    //   <Route path="*" element={<NotFount />} />
    // </Routes>
    <>
      <Layout>
        <div className="w-full bg-purple-heart h-14 opacity-90 flex justify-end items-center">
          <div className="text-white font-medium">{user?.full_name}</div>
          <div className="mx-4">
            <Avatar size="large" icon={<UserOutlined />} />
          </div>
          <Button type="text" onClick={onLogout}>
            <div className="text-white font-medium mr-4">Log out</div>
          </Button>
        </div>
        <Layout>
          <Layout>
            <Content className="bg-white">
              <Router>
                <Routes>
                  <Route path={page.static} element={<Static />} />
                  <Route path="*" element={<NotFount />} />
                </Routes>
              </Router>
            </Content>
          </Layout>
          <div className="bg-white">
            <Sider width={200} className="site-layout-background drop-shadow-sm max-h-128">
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item key="1">option10</Menu.Item>
                <Menu.Item key="2">option10</Menu.Item>
                <Menu.Item key="3">option10</Menu.Item>
                <Menu.Item key="4">option10</Menu.Item>
                <Menu.Item key="5">option10</Menu.Item>
              </Menu>
            </Sider>
          </div>
        </Layout>
      </Layout>
    </>
  );
}
