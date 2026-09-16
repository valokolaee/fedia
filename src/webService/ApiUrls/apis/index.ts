
import { ModelApi } from '../ModelApi';
import ApiObjectGenerator from './ApiObjectGenerator';
import IRegisterReq, { IRegisterRes } from './interfaces/Auth/IRegister';



export const register = ApiObjectGenerator<IRegisterReq, IRegisterRes>('auth/register',)


// const register: ModelApi = {
//   axiosType: 'post',
//   api: 'api',
//   apiUrl: 'Auth',
//   apiUrl2: 'register',
// } 


export default {
  register
};




