import ArrayList from "../lib/ArrayList"
import Url from "../lib/Url"
import { endpoints } from "../api/endPoints"


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

}
export default MessagesService