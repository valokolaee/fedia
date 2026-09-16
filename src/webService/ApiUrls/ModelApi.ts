 import axType from './axType';

export interface ModelApi<T = any> {
  folderUrl?:string
  axiosType: axType;
  apiUrl?: number|string;
  apiUrl2?: string;
  desc?: string;
  body?: T
  api?:'api'|'panel'
}


 
