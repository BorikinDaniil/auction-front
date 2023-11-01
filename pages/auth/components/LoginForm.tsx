import type { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
// Antd
import { Button, Form, Input } from 'antd';
// Types
import { IUserLogin, User } from '@ITypes/index';
// Utils
import { setCookies } from '@utils/cookies';
import userApi from '@api/user';
import { handleError } from '@utils/validation';
// Store
import  { useDispatch } from 'react-redux';
import { setUserInfo } from '@store/userSlice';
// Styles
import styles from '../../../styles/Auth.module.scss';

const RegistrationForm: NextComponentType = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const setUser = (payload: User) => dispatch(setUserInfo(payload));
  const onFinish = async(data: IUserLogin) => {

    try {
      const { data: { token, user } } = await userApi.login(data);

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
      <h1>
        Login
      </h1>

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

      <div className="form-link mt-20">
        New user?&nbsp;
        <Link href='/auth/registration'>
          Registration
        </Link>
      </div>

      <Form.Item>
        <Button
          className="w-100 mt-20"
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;