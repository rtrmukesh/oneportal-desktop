import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { isBadRequest } from "../lib/Http";

class LoginService {
  static login(data, callback) {
    apiClient
      .post(`${endpoints().userAPI}/loginByPassword`, data)
      .then(async (response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
            return callback && callback(response.data);
        }
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
        }
      });
  }
}
export default LoginService;
