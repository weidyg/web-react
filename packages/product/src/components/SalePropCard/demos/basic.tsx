/**
 * title: 销售属性卡片
 * description: 基本的销售属性卡片
 */
import { useState } from 'react';
import { message } from 'antd';
import { SalePropCard, } from '@web-react/biz-components';
import dataJson from './_data.json';
export default () => {
  const [value, setValue] = useState<any>();
  return (
    <>
      <SalePropCard
        uniqueGroup={true}
        options={dataJson.size}
        value={value}
        onOk={(val) => {
          setValue(val);
        }}
        onCancel={() => {
          message.info('click cancel');
        }}
      />
    </>
  );
};
