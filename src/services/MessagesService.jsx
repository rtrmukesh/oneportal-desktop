import ArrayList from "../lib/ArrayList"
import Url from "../lib/Url"
import { endpoints } from "../api/endPoints"
import { apiClient } from "../apiClient";


class MessagesService {

    static async search(params) {
        try {
            let queryString = await ArrayList.toQueryString(params);
            let response = await Url.get(`${endpoints().messageAPI}/search`, queryString)
            return response;
        } catch (err) {
            console.log(err);
            throw err
        }
    }

    static async getMessages(id) {
        try {
          if (id) {
            let response = await apiClient.get(`${endpoints().messageAPI}/${id}`);
            return response;
          }
        } catch (err) {
          console.log(err);
          return null;
        }
      }

      static async Create(data) {
        try {
          if (data) {
            let response = await apiClient.post(
              `${endpoints().messageAPI}/create`,
              data
            );
            return response;
          }
        } catch (error) {
          console.log(error);
        }
      }

      static update = (data, callback) => {
          apiClient
            .put(`${endpoints().messageAPI}`,data)
            .then((res) => {
              return callback && callback(res)
            })
      }
    
      static groupMessageReadAt = (data,callback) => {
        try{
          apiClient
            .put(`${endpoints().messageAPI}/groupMessageReadAt`,data).then((res)=>{
              return callback && callback(res)
            })
      }catch(err){
          console.log(err);
      }
      }

}
export default MessagesService