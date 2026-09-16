import { ModelApi } from '../ModelApi';

export default (api: ModelApi) => {
  const { apiUrl, apiUrl2, folderUrl } = api || {}

  if (apiUrl2) {
    if (!!!apiUrl) {
      // alert('apiUrl missing while apiUrl2 is defined')
      // throw ('apiUrl missing while apiUrl2 is defined');

    } else {
      return `${folderUrl}/${apiUrl}/${apiUrl2}`
    }
  } else if (apiUrl) {
    return `${folderUrl}/${apiUrl}`
  } else {
    return `${folderUrl}`
  }


};
