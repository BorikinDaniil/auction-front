import type { NextComponentType } from 'next';
import { Button, Select, Form, Input } from 'antd';
import styles from '../../../styles/Auth.module.scss';
import  { UserRegistration } from '../../../types';
import { setCookies } from '../../../utils/cookies';
import userApi from '../../../api/user';

import { useRouter } from 'next/router';

const { Option } = Select;

// TODO: find error type
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const RegistrationForm: NextComponentType = () => {
  const router = useRouter();
  const onFinish = async(data: UserRegistration) => {
    console.log('Success:', data);

    try {
      const { data: { token } } = await userApi.registration(data);

      setCookies('accessToken', token);
      await router.push('/');
    } catch (e: any) {
      console.log('e', e);
    }
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      className={styles['registration-form']}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: 'Please select gender!' }]}
      >
        <Select
          placeholder="select your gender"
          options={[{ value: 1, label: 'Male' }, { value: 2, label: 'Female' }]} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="passwordConfirm"
        label="Password confirmation"
        rules={[{
          required: true,
        },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
        validateTrigger="onSubmit"
      >
        <Input.Password
          name="passwordConfirm"
          type="password"
          placeholder="Confirm password"
          autoComplete="new-password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Registration
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;