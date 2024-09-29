import { FunctionComponent } from 'react';
import {
  Button, Select, Form, Input,
} from 'antd';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
// Styles
// Types
// Utils
import { setCookies } from '@utils/cookies';
import { handleError } from '@utils/validation';
// API
import userApi from '@api/user';
// Store
import { setUserInfo } from '@store/userSlice';
import { UserRegistration, User } from '../../../types/user';
import styles from '../../../styles/Auth.module.scss';

const RegistrationForm: FunctionComponent = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const setUser = (payload: User) => dispatch(setUserInfo(payload));

  const onFinish = async(data: UserRegistration): Promise<void> => {
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
