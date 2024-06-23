import { mapGetters } from "vuex";
import api from "../api";
import Navigation from "../components/Navigation.vue";
import { GET_USER_TOKEN_GETTER } from "../store/constant";
import { TimeFormatter } from "../services/TimeFormatter";
import Popup from "../components/Popup.vue";
import AddRecordForm from "../components/AddRecordForm.vue";

export default {
    components: {
        Navigation,
        AddRecordForm,
        Popup
    },
    data() {
        return {
            records: [],
            showAddRecordForm: false,
            noRecords: true,
            showPopup: false,
            popupMessage: ''
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN_GETTER
        })
    },
    mounted() {
        this.getRecords()
    },
    methods: {
        formatTime(timeString) {
            return TimeFormatter.fromISODate(timeString)
        },

        formatRecords(records) {
            this.records = []

            if (records.length === 0) {
                this.noRecords = true
            }
            else {
                this.noRecords = false
            }

            const sortedRecords = records.sort((a, b) => 
                new Date(b.time) - new Date(a.time)
            )

            let i = 1
            for (const record of sortedRecords) {
                this.records.push({
                    number: i,
                    time: record.time,
                    bloodPressure: {
                        systolic: record.bloodPressure.systolic,
                        diastolic: record.bloodPressure.diastolic
                    },
                    heartbeat: record.heartbeat,
                    respiratoryRate: record.respiratoryRate,
                    temperature: record.temperature
                })
                i++
            }
        },

        getRecords() {
            api.get("/record", {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                this.formatRecords(response.data.records)
            })
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

        closePopup() {
            this.showPopup = false
        }
    },
}