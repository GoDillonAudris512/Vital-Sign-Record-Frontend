import { mapActions } from "vuex"
import AuthValidations from "../services/AuthValidations"
import { REGISTER_ACTION } from "../store/constant"

export default {
    data() {
        return {
            email: '',
            password: '',
            errors: {}
        }
    },
    methods: {
        ...mapActions('auth', {
            register: REGISTER_ACTION
        }),
        async onRegister() {
            // Check if validations needed
            if (this.email.length == 0 && this.password.length == 0) {
                this.errors = {}
                return
            }

            // Validate input
            const authValidations = new AuthValidations(this.email, this.password)
            this.errors = authValidations.check()
            if ('email' in this.errors || 'password' in this.errors) {
                return
            }

            // Login using backend through vuex
            const message = await this.register({
                email: this.email,
                password: this.password
            })

            if (message !== 'Authenticated') {
                this.errors.message = message
            } else {
                this.errors = {}
                this.$router.push("/home")
            }
        }
    },
}