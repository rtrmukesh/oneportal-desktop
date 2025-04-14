import moment from "moment";


class DateTime {

    static formatTimestamp  (timestamp)  {
        const messageDate = moment(timestamp);
        const today = moment().startOf("day");
        const yesterday = moment().subtract(1, "day").startOf("day");
      
        if (messageDate.isSame(today, "day")) {
          return `Today, ${messageDate.format("hh:mm A")}`;
        } else if (messageDate.isSame(yesterday, "day")) {
          return `Yesterday, ${messageDate.format("hh:mm A")}`;
        } else {
          return messageDate.format("DD-MMM-YY, hh:mm A");
        }
      };
}
export default DateTime