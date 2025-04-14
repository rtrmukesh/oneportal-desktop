import { apiClient } from "../apiClient";


class Url {
    static async get(url, queryString) {
        let apiUrl;
    
        if (queryString && queryString.length > 0) {
          apiUrl = `${url}?${queryString.join("&")}`;
        } else {
          apiUrl = `${url}`;
        }
        const response = await apiClient.get(apiUrl);
        return response;
      }
    
}
export default Url;