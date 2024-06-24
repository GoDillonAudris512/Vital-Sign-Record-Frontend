import { SET_AUTO_LOGOUT_MUTATION, SET_USER_MUTATION } from "../../constant";

export default {
    // When user login/register, set the auth state
    [SET_USER_MUTATION](state, payload) {
        state.token = payload.token
        state.expiresAt = payload.expiresAt
        state.autoLogout = false
    },

    // When user auto-logout, set auto-logout state to true
    [SET_AUTO_LOGOUT_MUTATION](state) {
        state.autoLogout = true
    }
}