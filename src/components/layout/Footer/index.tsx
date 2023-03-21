import React from 'react'
import { useModel } from 'umi'
import { DefaultFooter } from '@ant-design/pro-layout'

const Footer: React.FC = () => {
  const { initialState } = useModel<any>('@@initialState')

  return !initialState?.settings?.collapsed ? (
    <DefaultFooter copyright='技术支持 - 2023' links={[]} />
  ) : null
};

export default Footer;
