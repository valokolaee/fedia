import axios from "axios";
import { config } from "..";
import ApiUrlService from "../ApiUrls/apiUrlService";
import { ModelApi } from "../ApiUrls/ModelApi";
import { IAxiosResponse } from "../IAxiosResponse";
import { localhost } from "../ApiUrls/apiUrlService/baseUrl";
// import toast from '@/src/utilities/toast';



export default async (apiModel: ModelApi,) => {
    const { body, axiosType } = apiModel
 


    var res: IAxiosResponse;

    try {

        if (axiosType === 'get') {
            res = await axios.get(ApiUrlService(apiModel, body), config,);
        } else {
            switch (axiosType) {
                case 'post':
                    res = await axios.post(ApiUrlService(apiModel, null), body, config);
                    break;
                case 'patch':
                    res = await axios.patch(ApiUrlService(apiModel, null), body, config);
                    break;
                case 'put':
                    res = await axios.put(ApiUrlService(apiModel, null), body, config);
                    break;
                case 'delete':
                    res = await axios.delete(ApiUrlService(apiModel, body), config);
                    break;
                
            }
        }


    } catch (error: any) {
        

        
        res = error?.response;

        if (res?.status) {
        } else {
        }
    }

    return res
}