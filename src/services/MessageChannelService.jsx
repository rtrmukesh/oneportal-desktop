import { endpoints } from "../api/endPoints";
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";



class MessageChannelService {
    static async search(params) {
        try {
          let queryString = await ArrayList.toQueryString(params);
          let response = await Url.get(`${endpoints().MessageChannelApi}/search`, queryString)
          return response;
        } catch (err) {
          console.log(err);
        }
      } 

}

export default MessageChannelService;