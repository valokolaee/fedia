
export default interface IResponse<T=any> {
    success?: boolean;
    message?: string;
    data?: T;
}

