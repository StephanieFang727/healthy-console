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
  const [formVals, setFormVals] = useState<FormValueType>({
    bulletin: props.values.bulletin,
  });


  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="修改公告"
      visible={updateModalVisible}
      onOk={()=>{
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            handleUpdate(values);
          })
      }}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          bulletin: values.bulletin,
        }}
      >
          <Form.Item
          name="bulletin"
          label="公告内容"
          // rules={[{ required: true, message: 'Please input username!', whitespace: true }]}
          >
          <Input.TextArea/>
      </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
