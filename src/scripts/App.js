import { AUTO_LOGIN_ACTION } from "../store/constant"
import { mapState } from "vuex"

export default {
    computed: {
        ...mapState({
            autoLogout: (state) => state.auth.autoLogout
        })
    },
    watch: {
        autoLogout(curValue, oldValue) {
            if (curValue && curValue !== oldValue) {
                this.$router.replace("/auth/login")
            }
        }
    },
    created() {
        this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`)
    }
}