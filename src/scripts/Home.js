import { mapGetters } from "vuex";
import api from "../api";
import Navigation from "../components/Navigation.vue";
import { GET_USER_TOKEN_GETTER } from "../store/constant";
import { TimeFormatter } from "../services/TimeFormatter";
import Popup from "../components/Popup.vue";

export default {
    components: {
        Navigation,
        Popup
    },
    data() {
        return {
            records: [],
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

        closePopup() {
            this.showPopup = false
        }
    },
}