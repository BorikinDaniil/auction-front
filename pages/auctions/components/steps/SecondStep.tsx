import React from 'react';
// Store
import { useSelector } from 'react-redux';
import { selectIsDesktop } from '@utils/store';
// Types
import { CategoriesList } from '@Types/categories';
// Components
import { DatePicker, Form, TreeSelect } from 'antd';
const { RangePicker } = DatePicker;

type Props = {
  categories: CategoriesList
}

const SecondStep: React.FC<Props> = ({ categories }) => {
  const isDesktop = useSelector(selectIsDesktop);

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
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          size={isDesktop ? 'large' : 'middle'}
        />
      </Form.Item>

      <Form.Item
        name="categories"
        rules={[{
          required: true,
        }]}
      >
        <TreeSelect
          showSearch
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeCheckable={true}
          showCheckedStrategy="SHOW_PARENT"
          placeholder="Please select"
          treeData={treeData}
          size={isDesktop ? 'large' : 'middle'}
        />
      </Form.Item>
    </>
  );
};

export default SecondStep;
