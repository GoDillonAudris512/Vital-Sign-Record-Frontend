import { SET_AUTO_LOGOUT_MUTATION, SET_USER_MUTATION } from "../../constant";

export default {
    [SET_USER_MUTATION](state, payload) {
        state.token = payload.token
        state.expiresAt = payload.expiresAt
        state.autoLogout = false
    },

    [SET_AUTO_LOGOUT_MUTATION](state) {
        state.autoLogout = true
    }
}