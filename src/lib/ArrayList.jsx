import Number from "./Number";


class ArrayList {

    static isArray(arrayList){
        if(arrayList && Array.isArray(arrayList) && arrayList.length > 0){
          return true
        }
        return false
      }

      static toQueryString(params) {

        const queryString = [];
    
        if (params) {
          Object.keys(params).forEach((param) => {
            if(Number.isNotNull(params[param])){
              queryString.push(`${param}=${params[param]}`);
            }
          });
        }
    
        return queryString;
      }

}
export default ArrayList;