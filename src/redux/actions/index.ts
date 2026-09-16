
import { TokenResponseDto } from '@/webService/periodcycleApis';
import IUser from '../interfaces/IUser';
import { SET_FONT_FAMILY, SET_FONT_SIZE } from '../slice/fontSlice';

import { SET_LOGIN_HIDE, SET_LOGIN_SHOW } from '../slice/loginSlice';
import { SET_IS_NUM_PER_PAGE } from '../slice/numPerPageSlice';
import { SET_TokenResponseDto } from '../slice/TokenResponseDtoSlice';
import { SET_USER } from '../slice/userSlice';
import { appDispatch } from '../store';



export const setUser = (data: IUser | undefined) => { appDispatch(SET_USER(data!)); };
export const setTokenResponseDtoSlice = (data: TokenResponseDto | undefined) => { appDispatch(SET_TokenResponseDto(data!)); };




export const setFontFamily = (data: string) => { appDispatch(SET_FONT_FAMILY({ family: { norm: data, bold: `${data}Bold` } })); };

export const setFontSize = (size: number) => { appDispatch(SET_FONT_SIZE({ size })); };


export const setNumPerPage = (n: number) => { appDispatch(SET_IS_NUM_PER_PAGE(n)); };

export const setLoginShow = () => { appDispatch(SET_LOGIN_SHOW()); };
export const setLoginHide = () => { appDispatch(SET_LOGIN_HIDE()); };

