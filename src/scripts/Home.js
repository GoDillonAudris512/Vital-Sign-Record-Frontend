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
    // Home page child component
    components: {
        Navigation,
        AddRecordForm,
        UpdateRecordForm,
        Popup
    },

    // Data needed on home page, mostly for component management
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

    // Computed variables
    computed: {
        // Get token fromm vuex store
        ...mapGetters('auth', {
            token: GET_USER_TOKEN_GETTER
        }),

        // Get records from vuex store
        ...mapGetters('records', {
            records: GET_RECORDS_GETTER
        })
    },

    // When page is mounted, get latest records
    mounted() {
        this.getRecords()
    },

    // Method
    methods: {
        // Map set record mutation from vuex store
        ...mapMutations('records', {
            setRecords: SET_RECORDS_MUTATION
        }),

        // Return time in custom format
        formatTime(timeString) {
            return TimeFormatter.fromISODate(timeString)
        },

        // Get latest record, send GET request to BE, and do mutation
        getRecords() {
            api.get("/record", {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                this.setRecords({records: response.data.records})

                // If records is empty, set noRecords to true
                if (this.records.length === 0) {
                    this.noRecords = true
                }
                // Else, set to false
                else {
                    this.noRecords = false
                }
            })
        },

        // Open update form, give record number to child
        updateRecord(number) {
            this.openUpdateRecordForm()
            this.updateRecordNumber = number - 1
        },

        // Delete existing record
        deleteRecord(number) {
            // Get record to be deleted
            const recordToBeDeleted = this.records[number - 1]
            
            // Send DELETE request to BE
            api.delete("/record", {
                headers: {
                    Authorization: `Bearer ${this.token}`
                },
                data: {
                    time: recordToBeDeleted.time
                }
            }).then(() => {
                // If success, show success popup
                this.showPopup = true
                this.popupMessage = "Record deleted!"
            }).catch(() => {
                // If error, show error popup
                this.showPopup = true
                this.popupMessage = "An error occured!"
            })

            // Get latest records
            this.getRecords()
        },

        // Open add form
        openAddRecordForm() {
            this.showAddRecordForm = true
        },

        // Close add form, get latest record
        closeAddRecordForm() {
            this.showAddRecordForm = false
            this.getRecords()
        },

        // Open update form
        openUpdateRecordForm() {
            this.showUpdateRecordForm = true
        }, 

        // Close update form, get latest record
        closeUpdateRecordForm() {
            this.showUpdateRecordForm = false
            this.updateRecordNumber = -1
            this.getRecords()
        },

        // Close popup
        closePopup() {
            this.showPopup = false
        }
    },
}