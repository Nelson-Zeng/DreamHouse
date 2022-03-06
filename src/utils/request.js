import React from 'react';
import axios from 'axios';
import Login from '@/components/login';
import ReactDOM from 'react-dom';

axios.defaults.baseURL = 'https://www.utawareruyume.com/api';
axios.defaults.timeout = 50000;
axios.defaults.withCredentials = false;

const request = async function (url, {header, data, needAuth}) {
  let newHeader = {};
  if (needAuth) {
    const token = localStorage.getItem('Token');
    if (!token) {
      ReactDOM.render(
        <Login />,
        document.getElementById('ext')
      );
    }
  }
  let body = {
    method: 'POST'
  };
  if (header) {
    newHeader = {...header, ...newHeader};
  }
  if (data) {
    body = {...body, ...data};
  }
};

export default request;
