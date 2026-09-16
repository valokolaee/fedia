export default interface IRegisterReq {
    mobile?: string;
    pin?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    maritalStatus?: string;
}

export  interface IRegisterRes { 
    accessToken: string;
    accessTokenExpireAt: Date
}