import { AxiosRequestConfig } from 'axios';
import React, { useImperativeHandle, useState } from 'react';

import { ModelApi } from './ApiUrls/ModelApi';
import apiCaller from './apiCaller';
import result from './result';
// import Background from '../components/ui/Background';
// import { LoadingOutlined } from '@ant-design/icons';
// import { Flex, Spin } from 'antd';
// import { useAppSelector } from '../redux/hooks';
// import { useNavigate } from 'react-router-dom';
// import { Button, message, Space } from 'antd';
const isDemo = true;

export var config: AxiosRequestConfig = {

}




export default React.forwardRef(({ className, size = 30, donTShowSpin, }: IWebService, ref) => {
  useImperativeHandle(ref, () => { return { callApi }; });
  // const token = useAppSelector((s) => s.userSlice.token)
  // const [messageApi, contextHolder] = message.useMessage();

  // const navigate = useNavigate();
  // const error = (content: string) => {
  //   messageApi.open({
  //     type: 'error',
  //     content
  //   });
  // };
  // const sec = (content: string) => {
  //   messageApi.open({
  //     type: 'success',
  //     content
  //   });
  // };
  const [showModal, setShowModal] = useState<ModelApi | undefined>(undefined);

  config = {
    headers: {
      // Authorization: `Bearer ${token}`,
    },

    beforeRedirect(options, responseDetails) {

    },


  }



  const callApi = async (apiModel: any) => {

    

    
    if (!donTShowSpin) {
      setShowModal(apiModel)
    }

    var res = await apiCaller(apiModel)

    setShowModal(undefined)


    const _res = result(res);

    if (_res?.success) {
      if (res.message) {
        // message.success(res.message)
      }
      return _res?.data
    } else {
      // message.error(_res?.error || 'error')
    }

  }

  return (
    <>


    </>
  );



});


export interface IWebServiceFuncs {

  callApi<T = any>(apiModel: any,): T

}
export interface IWebService {
  donTShowSpin?: boolean;
  size?: number;
  className?: string;
  relativeMode?: boolean;
  position?: TPosition

}




type TPosition = "center" | "pageFlew"
