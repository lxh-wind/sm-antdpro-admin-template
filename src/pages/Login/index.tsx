import React from 'react';
import { flushSync } from 'react-dom';
import { message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel, Helmet } from '@umijs/max';
import { fetchLogin } from '@/utils/auth';
import Footer from '@/components/layout/Footer';
import Settings from '../../../config/defaultSettings';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const initInfo = async () => {
    const currentUser = await initialState?.fetchUserInfo?.();
    const routeMenu = await initialState?.fetchRouteMenu?.();
    if (currentUser && routeMenu) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser,
          routeMenu,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      await fetchLogin(values);
      await initInfo();
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
    } catch (error) {
      console.log(error);
      message.error('登录失败，请重试！');
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>登录页 - {Settings.title}</title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={
            <img
              alt="logo"
              src="https://bcy-scrm.oss-cn-hangzhou.aliyuncs.com/material/ef60709a17d211f1ec719a9ee8d92245e76e9aa9.png"
            />
          }
          title="后台模板 pro"
          subTitle="后台模板"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <ProFormText
            name="phone"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder="请输入用户名!"
            rules={[{ required: true, message: '请输入用户名!' }]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="请输入密码！"
            rules={[{ required: true, message: '请输入密码！' }]}
          />
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
