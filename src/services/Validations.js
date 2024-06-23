export default class Validations {
    static isEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return true
        }
        return false
    }

    static minLength(val, minLength) {
        if (val.length < minLength) {
            return false
        }
        return true
    }

    static isEmpty(val) {
        return val.length == 0
    }

    static notNumber(val) {
        return !val
    }
}