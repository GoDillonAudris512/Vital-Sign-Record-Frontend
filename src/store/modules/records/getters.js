import { GET_RECORDS_GETTER } from "../../constant";

export default {
    // Get records from state
    [GET_RECORDS_GETTER](state) {
        return state.records
    }
}