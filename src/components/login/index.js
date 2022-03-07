import React from 'react';
import {Modal, Form, Input, message} from 'antd';
import './index.css';

const Login = ({ onSuccess, onCancel }) => {
  // 获取form实例
  const [form] = Form.useForm();

  const onCancelClick = () => {
    onCancel();
  };
  const onConfirmClick = () => {
    form.validateFields().then((res) => {
      console.log('nelson', res);
      onSuccess();
    })
      .catch(() => {message.error('请完成必填项的填写');});
  };

  return (
    <Modal visible centered title="登录" onCancel={onCancelClick}
      onOk={onConfirmClick}
      cancelText="取消" okText="登录">
      <Form name="login" form={form}>
        <Form.Item
          label="账号"
          name="account"
          rules={[{ required: true, message: '请输入您的账号' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="昵称"
          name="name"
          rules={[{ required: true, message: '请输入您的昵称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入您的用户密码' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Login;
