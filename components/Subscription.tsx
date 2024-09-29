import { FunctionComponent } from 'react';
import { Button, Form, Input } from 'antd';

// Styles
import styles from '../styles/Layout.module.scss';

const Subscription: FunctionComponent = () => {
  const [form] = Form.useForm();

  const onFinish = () => {

  };

  return (
    <div className={styles.subscription}>
      <div className={styles.subscription__title}>
        STAY UPTO DATE ABOUT OUR LATEST AUCTIONS
      </div>

      <div className={styles.subscription__form}>
        <Form
          name="subscription"
          layout="vertical"
          form={form}
          className={styles['registration-form']}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            className={styles['subscription__form--form-item']}
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input placeholder="Enter your email address" />
          </Form.Item>

          <Button className="small w-100">
            Subscribe to Newsletter
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Subscription;
