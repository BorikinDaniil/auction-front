import type { NextComponentType } from 'next';
import { Button, Select, Form, Input } from 'antd';
import styles from '../../../styles/Auth.module.scss';
import {IUserRegistration, User} from '@ITypes/user';
import { setCookies } from '@utils/cookies';
import userApi from '@api/user';
import { handleError } from '@utils/validation';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@store/userSlice';

const RegistrationForm: NextComponentType = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const setUser = (payload: User) => dispatch(setUserInfo(payload));
  const onFinish = async(data: IUserRegistration) => {

    try {
      const { data: { token, user } } = await userApi.registration(data);

      setCookies('accessToken', token);
      setUser(user);
      await router.push('/');
    } catch (e: any) {
      handleError(form, e);
    }
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      form={form}
      className={styles['registration-form']}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h1>
        Registration
      </h1>

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
        rules={[{ required: true, message: 'Please input your email!' }]}
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
        <Button
          className="w-100 mt-20"
          type="primary"
          htmlType="submit"
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;