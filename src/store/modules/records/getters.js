import { GET_RECORDS_GETTER } from "../../constant";

export default {
    [GET_RECORDS_GETTER](state) {
        return state.records
    }
}