import { ModelApi } from "../ModelApi";
import IReqRes from "./IReqRes";

export interface IApiObject<q = any, s = any> {
    getAll: (body?: IReqRes<q>['getAll']['req']) => ModelApi<IReqRes<s>['getAll']['req']>
    getOneByID: (body: IReqRes<q>['getOneByID']['req']) => ModelApi<IReqRes<q>['getOneByID']['req']>
    getOneByObject: (body: IReqRes<q>['getOneByObject']['req']) => ModelApi<IReqRes<q>['getOneByObject']['req']>
    getAllBy: (body?: IReqRes<q>['getAllBy']['req']) => ModelApi<IReqRes<q>['getAllBy']['req']>
    search: (body?: IReqRes<q>['search']['req']) => ModelApi<IReqRes<q>['search']['req']>

    create: (body: IReqRes<q>['create']['req']) => ModelApi<IReqRes<q>['create']['req']>
    update: (body: IReqRes<q>['update']['req']) => ModelApi<IReqRes<q>['update']['req']>
    delete: (body: IReqRes<q>['delete']['req']) => ModelApi<IReqRes<q>['delete']['req']>
    deletePermanently: (body: IReqRes<q>['delete']['req']) => ModelApi<IReqRes<q>['delete']['req']>


}






export default <q, s>(folderUrl: string, api?: ModelApi['api'],): IApiObject<q, s> => {
    return {
        getAll(body) { return { folderUrl, body, axiosType: 'get', api } },
        getOneByID(body) { return { folderUrl, axiosType: 'get', apiUrl: body, api } },
        getOneByObject(body) { return { folderUrl, axiosType: 'post', body, apiUrl: 'getOneByObject', api } },
        getAllBy(body) { return { folderUrl, body, axiosType: 'post', apiUrl: 'getAllBy', api } },
        search(body) { return { folderUrl, body, axiosType: 'post', apiUrl: 'search', api } },

        create(body) { return { folderUrl, body, axiosType: 'post', api } },
        update(body) { return { folderUrl, body, axiosType: 'put', api } },
        delete(body) { return { folderUrl, axiosType: 'delete', apiUrl: body, api } },
        deletePermanently(body) { return { folderUrl, axiosType: 'delete', apiUrl: body, api } },


    }
}
