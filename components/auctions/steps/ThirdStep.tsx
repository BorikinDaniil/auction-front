import React from 'react';
// Types
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { FilesInfo, FileType } from '@Types/form';
// Components
import { PictureOutlined, PlaySquareOutlined } from '@ant-design/icons';
import { Form, Upload } from 'antd';

const { Dragger } = Upload;

type Props = {
  setSuccessUploadStatus: (uploadRequestOption: UploadRequestOption) => void;
  onChangeImagesList: (info: FilesInfo) => void;
  onChangeVideosList: (info: FilesInfo) => void;
  beforeUpload: (file: FileType, allowedTypes: string) => string | boolean;
};

const ThirdStep: React.FC<Props> = ({
  setSuccessUploadStatus,
  onChangeImagesList,
  onChangeVideosList,
  beforeUpload,
}) => (
  <>
    <Form.Item
      name='image'
      valuePropName='imagesList'
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Dragger
        name='file'
        multiple={false}
        customRequest={setSuccessUploadStatus}
        onChange={onChangeImagesList}
        beforeUpload={file => beforeUpload(file, 'image/png')}
      >
        <p className='ant-upload-drag-icon'>
          <PictureOutlined />
        </p>
        <p className='ant-upload-text'>
          Click or drag file to this area to upload room image
        </p>
      </Dragger>
    </Form.Item>

    <Form.Item
      name='video'
      valuePropName='videosList'
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Dragger
        name='file'
        multiple={false}
        customRequest={setSuccessUploadStatus}
        onChange={onChangeVideosList}
        beforeUpload={file => beforeUpload(file, 'video/mp4')}
      >
        <p className='ant-upload-drag-icon'>
          <PlaySquareOutlined />
        </p>
        <p className='ant-upload-text'>
          Click or drag file to this area to upload room video
        </p>
      </Dragger>
    </Form.Item>
  </>
);

export default ThirdStep;
