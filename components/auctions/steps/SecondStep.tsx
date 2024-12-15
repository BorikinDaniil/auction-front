import React from 'react';
// Types
import { CategoriesList } from '@Types/categories';
// Components
import { Form } from 'antd';
import ARangePicker from '@Components/controls/ARangePicker';
import ATreeSelect from '@Components/controls/ATreeSelect';

type Props = {
  categories: CategoriesList;
};

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
        name='period'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <ARangePicker
          showTime={{ format: 'HH:mm' }}
          format='YYYY-MM-DD HH:mm'
        />
      </Form.Item>

      <Form.Item
        name='categories'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <ATreeSelect
          showSearch
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeCheckable
          showCheckedStrategy='SHOW_PARENT'
          placeholder='Please select'
          treeData={treeData}
        />
      </Form.Item>
    </>
  );
};

export default SecondStep;
