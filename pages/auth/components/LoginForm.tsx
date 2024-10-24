import type { NextComponentType } from 'next';
import { useRouter } from 'next/router';
// Antd
import {
  Button,
  Checkbox,
  Form,
  Input,
} from 'antd';
// Utils
import { setCookies } from '@utils/cookies';
import { handleError } from '@utils/validation';
import { selectIsDesktop } from '@utils/store';
// API
import userApi from '@api/user';
// Store
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '@store/userSlice';
// Types
import { UserLogin, User } from '@Types/user';
// Styles
import styles from '@styles/Auth.module.scss';

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

  const isDesktop = useSelector(selectIsDesktop);

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
        {/*TODO: unify size prop condition*/}
        <Input size={isDesktop ? 'large' : 'middle'} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password size={isDesktop ? 'large' : 'middle'} />
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
