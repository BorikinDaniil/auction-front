import type { NextComponentType } from 'next';
import { useRouter } from 'next/router';
// Components
import {
  Button,
  Checkbox,
  Form,
  Input,
} from 'antd';
import AInput from '@Components/controls/AInput';
// Utils
import { setCookies } from '@utils/cookies';
import { handleError } from '@utils/validation';
// API
import userApi from '@api/user';
// Store
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@store/userSlice';
// Types
import { UserLogin, User } from '@Types/user';
// Styles
import styles from '@styles/Auth.module.scss';
import AInputPassword from "@Components/controls/AInputPassword";

const LoginForm: NextComponentType = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const setUser = (payload: User) => dispatch(setUserInfo(payload));

  const onFinish = async(data: UserLogin) => {
    try {
      const { token, user } = (await userApi.login(data))?.data || {};

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
      className={styles['login-form']}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h1 className="mb-30">
        Login
      </h1>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
          <AInput />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <AInputPassword />
      </Form.Item>
      <Form.Item>
        <Checkbox>
          Remember me
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          className="w-100 mt-20"
          type="primary"
          htmlType="submit"
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
