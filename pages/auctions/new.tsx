import type { NextPage } from 'next';
import { useState } from 'react';
import { Button, Form, Input, Upload, message, DatePicker, UploadFile, InputNumber } from 'antd';
import { LockOutlined, MailOutlined, PictureOutlined, PlaySquareOutlined } from '@ant-design/icons';
// Utils
import { handleError } from '@utils/validation';
import { FilesInfo, FileType, NewAuctionFormData } from '@ITypes/form';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { formatToTimeStamp } from '@utils/date';
// API
import auctionApi from '@api/auctions';

const { RangePicker } = DatePicker;

const { Dragger } = Upload;

const NewAuction: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imagesList, setImagesList] = useState<FileType[]>([]);
  const [videosList, setVideosList] = useState<FileType[]>([]);
  const [form] = Form.useForm();

  const validateFileType = ({ type }: UploadFile, allowedTypes: string) => {
    if (!allowedTypes) {
      return true;
    }

    if (type) {
      return allowedTypes.includes(type);
    }
  };

  const beforeUpload = (file: FileType, allowedTypes: string) => {
    const isAllowedType = validateFileType(file, allowedTypes);
    const format = allowedTypes.split('/')[1];

    if (!isAllowedType) {
      message.error(`${file.name} is not ${format} file`);
      return Upload.LIST_IGNORE;
    }

    format === 'png' ? setImagesList([file]) : setVideosList([file]);

    return true;
  };

  const handleAddRoom = async(formData: NewAuctionFormData) => {
    setIsLoading(true);

    const {
      productName,
      productDescription,
      startPrice,
      step,
      period,
    } = formData;

    const [start, end] = period;

    const payload = new FormData();
    payload.append('productName', productName);
    payload.append('productDescription', productDescription);
    payload.append('image', imagesList[0]);
    payload.append('video', videosList[0]);
    payload.append('startAt', formatToTimeStamp(start));
    payload.append('endAt', formatToTimeStamp(end));
    payload.append('startPrice', startPrice.toString());
    payload.append('step', step.toString());

    try {
      await auctionApi.createAuction(payload);
      message.success('Room was successfully saved');
    } catch (e) {
      handleError(form, e);
    } finally {
      setIsLoading(false);
    }
  };

  const setSuccessUploadStatus = ({ onSuccess }: UploadRequestOption) => {
    if (onSuccess) {
      setTimeout(() => {
        onSuccess('ok');
      }, 0);
    }
  };

  const onChangeImagesList = (info: FilesInfo) => {
    if (info.file.originFileObj) setImagesList([info.file.originFileObj]);

  };

  const onChangeVideosList = (info: FilesInfo) => {
    if (info.file.originFileObj) setVideosList([info.file.originFileObj]);
  };

  return (
    <div className="page">
    <div className="page__container">
      <h1>New Auction</h1>

      <Form
        className="add-room__form"
        name="addRoom"
        form={form}
        onFinish={handleAddRoom}
      >
        <Form.Item
          name="productName"
          rules={[{
            min: 4,
            max: 256,
            required: true,
          }]}
          validateTrigger="onSubmit"
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Room name"
            type="text"
          />
        </Form.Item>

        <Form.Item
          name="productDescription"
          rules={[{
            required: true,
            min: 4,
            max: 1024,
          }]}
          validateTrigger="onSubmit"
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Description"
          />
        </Form.Item>

        <Form.Item
          name="startPrice"
          rules={[{
            required: true,
          }]}
          validateTrigger="onSubmit"
        >
          <InputNumber
            prefix={<LockOutlined className="site-form-item-icon" />}
            min={1}
            max={100000000}
            placeholder=""
          />
        </Form.Item>

        <Form.Item
          name="step"
          rules={[{
            required: true,
          }]}
          validateTrigger="onSubmit"
        >
          <InputNumber
            prefix={<LockOutlined className="site-form-item-icon" />}
            min={1}
            max={1000000}
            placeholder=""
          />
        </Form.Item>

        <Form.Item
          name="period"
          rules={[{
            required: true,
          }]}
          validateTrigger="onSubmit"
        >
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>

        <Form.Item
          name="image"
          valuePropName="imagesList"
          rules={[{
            required: true,
          }]}
        >
          <Dragger
            name="file"
            multiple={false}
            customRequest={setSuccessUploadStatus}
            onChange={onChangeImagesList}
            beforeUpload={file => beforeUpload(file, 'image/png')}
          >
            <p className="ant-upload-drag-icon">
              <PictureOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload room image</p>
          </Dragger>
        </Form.Item>

        <Form.Item
          name="video"
          valuePropName="videosList"
          rules={[{
            required: true,
          }]}
        >
          <Dragger
            name="file"
            multiple={false}
            customRequest={setSuccessUploadStatus}
            onChange={onChangeVideosList}
            beforeUpload={file => beforeUpload(file, 'video/mp4')}
          >
            <p className="ant-upload-drag-icon">
              <PlaySquareOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload room video</p>
          </Dragger>
        </Form.Item>

        <div className="add-room__form--actions">
          <Form.Item>
            {/*<Button*/}
            {/*  onClick={handleCloseModal}*/}
            {/*>*/}
            {/*  Cancel*/}
            {/*</Button>*/}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form__submit"
              loading={isLoading}
            >
              Add Auction
            </Button>
          </Form.Item>
        </div>
      </Form>
  </div>
  </div>
  );
};

export default NewAuction;
