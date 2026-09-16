 import IResponse from "./IResponse";

export default interface IReqRes<Q> {
    getAll: TReqRes<never, IResponse<Q[]>>;
    getOneByID: TReqRes<number, IResponse<Q>>;
    getOneByObject: TReqRes<Partial<Q>, IResponse<Q>>;
    getAllBy: TReqRes<Partial<Q>, IResponse<Q[]>>;
    search: TReqRes<Partial<Q >, IResponse<Q[]>>;

    create: TReqRes<Q, IResponse<Q>>;
    update: TReqRes<Partial<Q>, IResponse<Q>>;
    delete: TReqRes<number, IResponse>;
}



export interface TReqRes<Q, S> {
    req: Q;
    res: S
}



