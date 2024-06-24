import { mapActions } from "vuex"
import AuthValidations from "../services/AuthValidations"
import { LOGIN_ACTION } from "../store/constant"

export default {
    // Data to be displayed on login page
    data() {
        return {
            email: '',
            password: '',
            errors: {}
        }
    },

    // Methods
    methods: {
        // Map login action from vuex store
        ...mapActions('auth', {
            login: LOGIN_ACTION
        }),

        // When login button is clicked, perform login action
        async onLogin() {
            // Check if validations needed
            if (this.email.length == 0 && this.password.length == 0) {
                this.errors = {}
                return
            }

            // Validate inputs
            const authValidations = new AuthValidations(this.email, this.password)
            this.errors = authValidations.check()
            if ('email' in this.errors || 'password' in this.errors) {
                return
            }

            // Login using backend through vuex store
            const message = await this.login({
                email: this.email,
                password: this.password
            })
            
            // If error occured, display error message
            if (message !== 'Authenticated') {
                this.errors.message = message
            }
            // Login successful, redirect to home page 
            else {
                this.errors = {}
                this.$router.push("/home")
            }
        }
    },
}