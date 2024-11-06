import React from 'react';
// Components
import { Form, Input, InputNumber } from 'antd';
import { DollarOutlined, DropboxOutlined } from '@ant-design/icons';
import AutoResizeWrapper from '@Components/AutoResizeInput';
// Styles
import styles from '@styles/Auction.module.scss';

const { TextArea } = Input;

const FirstStep: React.FC = () => {

  return (
    <div className={styles['add-room__form__first-step']}>
      <div className={styles['add-room__form__first-step__item']}>
        <Form.Item
          name="productName"
          rules={[{
            min: 4,
            max: 256,
            required: true,
          }]}
        >
          <AutoResizeWrapper>
            <Input
              prefix={<DropboxOutlined />}
              placeholder="Product name"
              type="text"
            />
          </AutoResizeWrapper>
        </Form.Item>

        <Form.Item
          name="productDescription"
          rules={[{
            required: true,
            min: 4,
            max: 1024,
          }]}
        >
          <TextArea
            showCount
            maxLength={500}
            placeholder="Description"
            style={{ height: 120, resize: 'none' }}
          />
        </Form.Item>
      </div>

      <div className={styles['add-room__form__first-step__item']}>
        <Form.Item
          name="startPrice"
          rules={[{
            required: true,
          }]}
        >
          <AutoResizeWrapper>
            <InputNumber
              prefix={<DollarOutlined />}
              min={1}
              max={100000000}
              placeholder="Start Price"
            />
          </AutoResizeWrapper>
        </Form.Item>

        <Form.Item
          name="step"
          rules={[{
            required: true,
          }]}
        >
          <AutoResizeWrapper>
            <InputNumber
              prefix={<DollarOutlined />}
              min={1}
              max={1000000}
              placeholder="Step"
            />
          </AutoResizeWrapper>
        </Form.Item>
      </div>
    </div>
  );
};

export default FirstStep;