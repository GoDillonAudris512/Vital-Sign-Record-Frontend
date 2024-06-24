// General Validations class
export default class Validations {
    // Check if a string is an email using regex
    static isEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return true
        }
        return false
    }

    // Check if a string consists of minimal-length characters or more
    static minLength(val, minLength) {
        if (val.length < minLength) {
            return false
        }
        return true
    }

    // Check if a string is empty
    static isEmpty(val) {
        return val.length == 0
    }

    // Check if a value is a number or not
    static notNumber(val) {
        return !val
    }
}