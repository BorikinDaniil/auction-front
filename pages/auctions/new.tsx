import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
// API
import auctionApi from '@api/auctions';
import categoriesApi from '@api/categories';
// Utils
import { handleError } from '@utils/validation';
import { formatToTimeStamp } from '@utils/date';
import { UploadRequestOption } from 'rc-upload/lib/interface';
// Types
import { FilesInfo, FileType, NewAuctionFormData } from '@Types/form';
import { CategoriesList } from '@Types/categories';
import { CarouselRef } from 'antd/es/carousel';
import { FieldError } from 'rc-field-form/es/interface';
// Components
import AuctionSteps from '@Components/auctions/AuctionSteps';
import FirstStep from '@Components/auctions/steps/FirstStep';
import SecondStep from '@Components/auctions/steps/SecondStep';
import ThirdStep from '@Components/auctions/steps/ThirdStep';
import {
  Button,
  Form,
  Upload,
  message,
  UploadFile,
  Carousel,
} from 'antd';

const FIRST_STEP = 0;
const STEPS_AMOUNT = 2;

const FIRST_STEP_FIELDS = ['productName', 'productDescription', 'startPrice', 'step'];
const SECOND_STEP_FIELDS = ['period', 'categories'];


export const getServerSideProps: GetServerSideProps<{ categories: CategoriesList }> = (async() => {
  let categories = [];

  try {
    categories = (await categoriesApi.getCategories())?.data || [];
  } catch (e: any) {
    categories = [];
    console.error(e);
  }

  return { props: { categories } };
});

const NewAuction = ({ categories }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imagesList, setImagesList] = useState<FileType[]>([]);
  const [videosList, setVideosList] = useState<FileType[]>([]);
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  // Refs
  const carousel = useRef<CarouselRef | null>(null);
  // Form
  const [form] = Form.useForm();
  
  const progressiveForm = {
    ...form,
    submit: async(): Promise<void> => {
      let step;
      // Allows to get the current state in the nextStep
      setCurrentStep(currentStep => {
        step = currentStep;
        return currentStep;
      });

      if (step !== STEPS_AMOUNT) {
        await nextStep();
      } else {
        form.submit();
      }

    },
  };

  useEffect(() => {
    carousel?.current?.goTo(currentStep);
  }, [currentStep, carousel]);

  const isLastStep = currentStep === STEPS_AMOUNT;

  const validateFileType = useCallback(({ type }: UploadFile, allowedTypes: string): boolean => {
    if (!allowedTypes) {
      return true;
    }

    if (type) {
      return allowedTypes.includes(type);
    }

    return false;
  }, []);

  const beforeUpload = (file: FileType, allowedTypes: string): string | boolean => {
    const isAllowedType = validateFileType(file, allowedTypes);
    const format = allowedTypes.split('/')[1];

    if (!isAllowedType) {
      message.error(`${file.name} is not ${format} file`);
      return Upload.LIST_IGNORE;
    }

    if (format === 'png') {
      setImagesList(() => [file]);
    } else {
      setVideosList(() => [file]);
    }

    return true;
  };

  const handleAddRoom = async(formData: NewAuctionFormData): Promise<void> => {
    setIsLoading(() => true);

    const {
      productName,
      productDescription,
      startPrice,
      step,
      period,
      categories: selectedCategories,
    } = formData;

    const formattedCategories = selectedCategories.map(category => {
      if (category.includes('-')) return category.split('-')[1];

      const subCategories = categories.find(parent => parent.id === Number(category))?.subCategories || [];

      return subCategories.map(subCategory => `${subCategory.id}`);
    }).flat(1);

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

    formattedCategories.forEach(category => payload.append('subCategories', category));

    try {
      await auctionApi.createAuction(payload);
      setCurrentStep(() => FIRST_STEP);
      progressiveForm.resetFields();
      message.success('Auction was successfully saved. Form was reset');
    } catch (e) {
      handleError(progressiveForm, e);
    } finally {
      setIsLoading(false);
    }
  };

  const setSuccessUploadStatus = ({ onSuccess }: UploadRequestOption): void => {
    if (onSuccess) {
      setTimeout(() => {
        onSuccess('ok');
      }, 0);
    }
  };

  const onChangeImagesList = (info: FilesInfo): void => {
    if (info.file.originFileObj) setImagesList([info.file.originFileObj]);
  };

  const onChangeVideosList = (info: FilesInfo): void => {
    if (info.file.originFileObj) setVideosList([info.file.originFileObj]);
  };

  const validateFields = async(fields: string[]): Promise<void> => {
    try {
      await progressiveForm.validateFields(fields);
    } catch (e) {
      // validateFields occurs errors
      console.error(e);
    }
  };

  const nextStep = async() => {
    let errors: FieldError[] = [];

    if (currentStep === 0) {
      await validateFields(FIRST_STEP_FIELDS);
      errors = progressiveForm.getFieldsError(FIRST_STEP_FIELDS);
    }

    if (currentStep === 1) {
      await validateFields(SECOND_STEP_FIELDS);
      errors = progressiveForm.getFieldsError(SECOND_STEP_FIELDS);
    }

    const notEmptyErrors = errors.filter(error => error.errors?.length).length;

    if (notEmptyErrors) return;

    setCurrentStep(currentStep => currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep => currentStep - 1);
  };

  return (
    <div className="page">
      <div className="page__container">
        <h1>New Auction</h1>
        <AuctionSteps
          current={currentStep}
        />

        <Form
          className="add-room__form"
          name="addRoom"
          form={progressiveForm}
          validateTrigger="onSubmit"
          onFinish={handleAddRoom}
        >

          <Carousel
            dots={false}
            ref={carousel}
          >
            <FirstStep/>
            <SecondStep categories={categories} />
            <ThirdStep
              setSuccessUploadStatus={setSuccessUploadStatus}
              onChangeImagesList={onChangeImagesList}
              onChangeVideosList={onChangeVideosList}
              beforeUpload={beforeUpload}
            />
          </Carousel>

          <div className="add-room__form--actions">
            <Form.Item>
              <div className='d-flex flex-align-center'>
                {
                  currentStep > 0 && <Button
                    type="primary"
                    className="login-form__submit mr-12"
                    loading={isLoading}
                    onClick={prevStep}
                  >
                    Prev Step
                  </Button>
                }
                <Button
                  type="primary"
                  className="login-form__submit"
                  htmlType="submit"
                  loading={isLoading}
                  >
                    { isLastStep ? 'Add Auction' : 'Next Step' }
                </Button>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewAuction;
