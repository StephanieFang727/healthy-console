import React, {useEffect, useState} from 'react';
import { Link, connect, Dispatch } from 'umi';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete, Spin,
} from 'antd';
import {ConnectState} from "@/models/connect";


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

const AccountSettings = ({currentUser, loading, dispatch}) => {
  const [form] = Form.useForm();
  const [formInfo, setFormValue] = useState({});
  const onFinish = values => {
    setFormValue({...currentUser,...values});

  };
  useEffect(() => {
    if(!Object.keys(formInfo).length){
      return;
    }
    if (dispatch) {
      dispatch({
        type: 'user/updateUserInfo',
        payload: formInfo,
      });
    }
  }, [formInfo]);
  if(loading || !Object.keys(currentUser).length){
    return <Spin></Spin>
  }
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        person_name: currentUser.person_name,
        age: currentUser.age,
        sex: currentUser.sex,
        birthday: currentUser.birthday,
        identityNumber: currentUser.identityNumber,
        address: currentUser.address,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="person_name"
        label="用户名"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="age"
        label="年龄"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="sex"
        label="性别"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="birthday"
        label="生日"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="identityNumber"
        label="身份证号"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="地址"
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          更新
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(({ user, global, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.effects['user/fetchCurrent']
}))(AccountSettings);
