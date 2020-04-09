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

const ThresholdSettings = ({threshold, loading, dispatch}) => {
  const [form] = Form.useForm();
  const [formInfo, setFormValue] = useState({});
  const onFinish = values => {
    setFormValue({...threshold,...values});

  };
  useEffect(() => {
    if(!Object.keys(formInfo).length){
      return;
    }
    if (dispatch) {
      dispatch({
        type: 'user/updateThreshold',
        payload: formInfo,
      });
    }
  }, [formInfo]);
  if(loading || !Object.keys(threshold).length){
    return <Spin></Spin>
  }
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={threshold}
      scrollToFirstError
    >
      <Form.Item
        name="threshold_bloodPressure_up"
        label="血压上阈值"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="threshold_bloodPressure_low"
        label="血压下阈值"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="threshold_bloodSugar_up"
        label="血糖上阈值"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="threshold_bloodSugar_low"
        label="血糖下阈值"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="threshold_pulse_up"
        label="脉搏上阈值"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="threshold_pulse_low"
        label="脉搏下阈值"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="threshold_heartRate_up"
        label="心率上阈值"
      >
        <Input />
      </Form.Item>
      <Form.Item
      name="threshold_heartRate_low"
      label="心率下阈值"
    >
      <Input />
    </Form.Item>
      <Form.Item
        name="threshold_temperature_up"
        label="体温上阈值"
      >
        <Input />
      </Form.Item>
      <Form.Item
      name="threshold_temperature_low"
      label="体温下阈值"
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

export default  connect(({ user, loading }: ConnectState) => ({
  threshold: user.threshold,
  loading: loading.effects['user/fetchThreshold']
}))(ThresholdSettings);
