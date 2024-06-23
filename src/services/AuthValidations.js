import Validations from "./Validations"

export default class AuthValidations {
    constructor(email, password) {
        this.email = email
        this.password = password
    }

    check() {
        let errors = {}
        
        if (!Validations.isEmail(this.email)) {
            errors.email = "Invalid email!"
        }

        if (!Validations.minLength(this.password, 8)) {
            errors.password = "Password should be of 8 characters!"
        }

        return errors
    }
}