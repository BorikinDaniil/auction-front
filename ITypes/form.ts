import { GetProps, GetProp, UploadFile, UploadProps, DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

export type DateValue = Dayjs | null;

type RangeValue = [DateValue, DateValue];

export interface FilesInfo {
  file: UploadFile;
  fileList: UploadFile[];
}

export interface NewAuctionFormData {
  image : FilesInfo;
  period: RangeValue;
  productDescription: string;
  productName: string;
  startPrice: number,
  step: number,
  video: FilesInfo,
}