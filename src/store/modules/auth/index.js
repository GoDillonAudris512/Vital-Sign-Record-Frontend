import actions from "./actions"
import getters from "./getters"
import mutations from "./mutations"

export default {
    namespaced: true,
    state() {
        return {
            // Auth state consist of token, expiration time, and auto-logout condition
            token: null,
            expiresAt: null,
            autoLogout: false
        }
    },
    mutations,
    getters,
    actions
}