export default class ApiMethods {
  static initFetchCall(urlPath, configOptions){
    return fetch(urlPath)
        .then(response => {
            let res = response.json()
            // console.log('res', res)
            return res
          }
          )
        .catch(error => {
          // console.log(error);
          return error;
        })
  }
}