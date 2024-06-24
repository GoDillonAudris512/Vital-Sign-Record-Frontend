import { AUTO_LOGIN_ACTION } from "../store/constant"
import { mapState } from "vuex"

export default {
    // Computed variables
    computed: {
        // Get auto-logout state from store
        ...mapState({
            autoLogout: (state) => state.auth.autoLogout
        })
    },
    
    // Watchs
    watch: {
        // Watch for changes in autoLogout variable
        autoLogout(curValue, oldValue) {
            // If auto-logout occured, redirect user to login page
            if (curValue && curValue !== oldValue) {
                this.$router.replace("/auth/login")
            }
        }
    },

    // When app is created, perform auto-login action
    created() {
        this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`)
    }
}