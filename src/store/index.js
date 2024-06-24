import { createStore } from 'vuex'
import auth from "./modules/auth"
import records from "./modules/records"

// Put all vuex store module into the store
const store =  createStore({
    modules: {
        auth,
        records
    }
})

export default store