import React, { useState } from 'react';
import { Form, Input, Modal, } from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  bulletin?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {

  const [form] = Form.useForm();

  const {
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '8px 8px 8px' }}
      destroyOnClose
      title="每日健康状况分析"
      visible={updateModalVisible}
      onCancel={() => handleUpdateModalVisible()}
      footer={null}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          comment: values.comment,
          status: values.status,
        }}
      >
          <Form.Item
          name="comment"
          label="评价内容"
          >
          <Input.TextArea style={{ height: 120}}/>
      </Form.Item>
        <Form.Item
          name="status"
          label="综合评价"
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
