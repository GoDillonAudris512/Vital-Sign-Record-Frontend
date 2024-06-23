import { GET_USER_TOKEN_GETTER, IS_AUTHENTICATED_GETTER } from "../../constant";

export default {
    [GET_USER_TOKEN_GETTER](state) {
        return state.token
    },
    [IS_AUTHENTICATED_GETTER](state) {
        return !!state.token
    }
}