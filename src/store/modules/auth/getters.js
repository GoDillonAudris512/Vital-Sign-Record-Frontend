import { GET_USER_TOKEN_GETTER, IS_AUTHENTICATED_GETTER } from "../../constant";

export default {
    // Get token from state
    [GET_USER_TOKEN_GETTER](state) {
        return state.token
    },

    // Check if user is authenticated or not
    [IS_AUTHENTICATED_GETTER](state) {
        return !!state.token
    }
}