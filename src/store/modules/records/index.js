import actions from "./actions"
import getters from "./getters"
import mutations from "./mutations"

export default {
    namespaced: true,
    state() {
        return {
            // Record state consist of array of records
            records: []
        }
    },
    mutations,
    getters,
    actions
}