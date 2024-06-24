import { mapActions } from "vuex"
import AuthValidations from "../services/AuthValidations"
import { REGISTER_ACTION } from "../store/constant"

export default {
    // Data to be displayed on register page
    data() {
        return {
            email: '',
            password: '',
            errors: {}
        }
    },

    // Methods
    methods: {
        // Map register action from vuex store
        ...mapActions('auth', {
            register: REGISTER_ACTION
        }),

        // When register button is clicked, perform register action
        async onRegister() {
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

            // Register using backend through vuex store
            const message = await this.register({
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