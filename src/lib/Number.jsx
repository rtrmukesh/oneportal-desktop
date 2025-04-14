


class Number {
    static isNotNull(value) {
        if (value && value !== "undefined" && value !== undefined && value !=="" && value !=="null") {
          return true;
        }
        return false;
      }
}
export default Number;