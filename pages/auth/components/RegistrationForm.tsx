import { FunctionComponent } from 'react';
// Store
import { setUserInfo } from '@store/userSlice';
import { useDispatch } from 'react-redux';
// Components
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import AInput from '@Components/controls/AInput';
import AInputPassword from '@Components/controls/AInputPassword';
// Utils
import { setCookies } from '@utils/cookies';
import { handleError } from '@utils/validation';
// API
import userApi from '@api/user';
// Types
import { UserRegistration, User } from '@Types/user';
// Styles
import styles from '@styles/Auth.module.scss';

const RegistrationForm: FunctionComponent = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const setUser = (payload: User) => dispatch(setUserInfo(payload));

  const onFinish = async(data: UserRegistration): Promise<void> => {
    try {
      const { token, user } = (await userApi.registration(data))?.data || {};

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
        <AInput />
      </Form.Item>

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
        <AInputPassword
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
