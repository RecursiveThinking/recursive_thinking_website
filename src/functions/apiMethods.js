export default class ApiMethods {
  static initFetchCall(urlPath, configOptions){
    return fetch(urlPath)
                    .then(response => response.json())
                    .catch(error => {
                      console.log(error);
                      return error;
                    })
  }
  static postData(urlPath, configOptions){
    return fetch(urlPath)
                    .then(response => response.json())
                    .catch(error => {
                      console.log(error);
                      return error;
                    })
  }
}