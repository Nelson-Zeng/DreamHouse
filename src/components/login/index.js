import React, {useState, useEffect} from 'react';
import {Modal, Form, Input} from 'antd';
import './index.css';

const Login = (props) => {
  const [visiblity, setVisibility] = useState(true);
  console.log('nelson', props);
  return (
    <Modal visible={visiblity}></Modal>
  );
};

export default Login;
