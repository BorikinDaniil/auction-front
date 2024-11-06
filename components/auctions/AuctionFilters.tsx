import React from 'react';
import { Form, Input } from 'antd';
import { DropboxOutlined } from '@ant-design/icons';
import AutoResizeWrapper from '@Components/AutoResizeInput';


const AuctionFilters: React.FC = () => {
  return (
    <div className="auction-filters">
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
    </div>
  );
};

export default AuctionFilters;
