import actions from "./actions"
import getters from "./getters"
import mutations from "./mutations"

export default {
    namespaced: true,
    state() {
        return {
            token: null,
            expiresAt: null,
            autoLogout: false
        }
    },
    mutations,
    getters,
    actions
}