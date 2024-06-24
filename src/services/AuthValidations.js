import Validations from "./Validations"

// Class to validate auth data
export default class AuthValidations {
    // Auth data consists of email and password
    constructor(email, password) {
        this.email = email
        this.password = password
    }

    // Validate auth data, give error message if validation failed
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