import { createStore } from 'vuex'
import auth from "./modules/auth"
import records from "./modules/records"

const store =  createStore({
    modules: {
        auth,
        records
    }
})

export default store