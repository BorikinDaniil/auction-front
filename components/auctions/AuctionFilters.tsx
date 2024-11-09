import React from 'react';
import { Form } from 'antd';
import { DropboxOutlined } from '@ant-design/icons';
import AInput from '@Components/controls/AInput';


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
          <AInput
            prefix={<DropboxOutlined />}
            placeholder="Product name"
            type="text"
          />
      </Form.Item>
    </div>
  );
};

export default AuctionFilters;
