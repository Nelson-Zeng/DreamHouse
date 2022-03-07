import React from 'react';
import axios from 'axios';
import Login from '@/components/login';
import ReactDOM from 'react-dom';

axios.defaults.baseURL = 'https://www.utawareruyume.com/api';
axios.defaults.timeout = 50000;
axios.defaults.withCredentials = false;

const request = async function (url, {header, data}) {
  let newHeader = {};
  let body = {
    method: 'POST'
  };
  if (header) {
    newHeader = {...header, ...newHeader};
  }
  if (data) {
    body = {...body, ...data};
  }
  const res = await login().catch(() => {});
};

const login = () => new Promise((resolve, reject) => {
  const onCancel = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('login'));
    reject(new Error('用户未登录'));
  };

  const onSuccess = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('login'));
    resolve(true);
  };

  ReactDOM.render(
    <Login onCancel={onCancel} onSuccess={onSuccess}/>,
    document.getElementById('login')
  );
});

export default request;
