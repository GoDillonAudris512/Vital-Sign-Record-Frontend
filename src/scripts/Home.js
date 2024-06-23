import { mapGetters } from "vuex";
import api from "../api";
import Navigation from "../components/Navigation.vue";
import { GET_RECORDS_GETTER, GET_USER_TOKEN_GETTER, SET_RECORDS_MUTATION } from "../store/constant";
import { TimeFormatter } from "../services/TimeFormatter";
import Popup from "../components/Popup.vue";
import AddRecordForm from "../components/AddRecordForm.vue";
import { mapActions, mapMutations } from "vuex/dist/vuex.cjs.js";
import UpdateRecordForm from "../components/UpdateRecordForm.vue";

export default {
    components: {
        Navigation,
        AddRecordForm,
        UpdateRecordForm,
        Popup
    },
    data() {
        return {
            showAddRecordForm: false,
            showUpdateRecordForm: false,
            updateRecordNumber: -1,
            noRecords: true,
            showPopup: false,
            popupMessage: ''
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN_GETTER
        }),
        ...mapGetters('records', {
            records: GET_RECORDS_GETTER
        })
    },
    mounted() {
        this.getRecords()
    },
    methods: {
        ...mapMutations('records', {
            setRecords: SET_RECORDS_MUTATION
        }),

        formatTime(timeString) {
            return TimeFormatter.fromISODate(timeString)
        },

        getRecords() {
            api.get("/record", {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                this.setRecords({records: response.data.records})

                if (this.records.length === 0) {
                    this.noRecords = true
                }
                else {
                    this.noRecords = false
                }
            })
        },

        updateRecord(number) {
            this.openUpdateRecordForm()
            this.updateRecordNumber = number - 1
        },

        deleteRecord(number) {
            const recordToBeDeleted = this.records[number - 1]
            
            api.delete("/record", {
                headers: {
                    Authorization: `Bearer ${this.token}`
                },
                data: {
                    time: recordToBeDeleted.time
                }
            }).then(() => {
                this.showPopup = true
                this.popupMessage = "Record deleted!"
            }).catch(() => {
                this.showPopup = true
                this.popupMessage = "An error occured!"
            })

            this.getRecords()
        },

        openAddRecordForm() {
            this.showAddRecordForm = true
        },

        closeAddRecordForm() {
            this.showAddRecordForm = false
            this.getRecords()
        },

        openUpdateRecordForm(number) {
            this.showUpdateRecordForm = true
        },

        closeUpdateRecordForm() {
            this.showUpdateRecordForm = false
            this.updateRecordNumber = -1
            this.getRecords()
        },

        closePopup() {
            this.showPopup = false
        }
    },
}