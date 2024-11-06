import React from 'react';
// Types
import { CategoriesList } from '@Types/categories';
// Components
import { DatePicker, Form, TreeSelect } from 'antd';
const { RangePicker } = DatePicker;
import AutoResizeWrapper from '@Components/AutoResizeInput';

type Props = {
  categories: CategoriesList
}

const SecondStep: React.FC<Props> = ({ categories }) => {
  const treeData = categories.map(category => ({
    ...category,
    value: `${category.id}`,
    title: category.name,
    children: category.subCategories.map(subCategory => ({
      ...subCategory,
      value: `${category.id}-${subCategory.id}`,
      title: subCategory.name,
    })),
  }));

  return (
    <>
      <Form.Item
        name="period"
        rules={[{
          required: true,
        }]}
      >
        <AutoResizeWrapper>
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
          />
        </AutoResizeWrapper>
      </Form.Item>

      <Form.Item
        name="categories"
        rules={[{
          required: true,
        }]}
      >
        <AutoResizeWrapper>
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeCheckable={true}
            showCheckedStrategy="SHOW_PARENT"
            placeholder="Please select"
            treeData={treeData}
          />
        </AutoResizeWrapper>
      </Form.Item>
    </>
  );
};

export default SecondStep;
