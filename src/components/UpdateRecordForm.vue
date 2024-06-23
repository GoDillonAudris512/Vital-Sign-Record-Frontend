<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div class="relative bg-white w-1/2 p-6 rounded-lg shadow-lg">
        <form @submit.prevent="onUpdateRecord()">   
            <div class="p-6 shadow-lg bg-white rounded-md">
                <h1 class="text-3xl block font-semibold text-blue-secondary"><i class="fa-solid fa-clipboard mr-5"></i>Update Record</h1>
                <hr class="mt-3">
                <div class="mt-3">
                    <p class="block text-base mb-2">Time</p>
                    <div class="flex flex-row">
                        <div class="flex flex-row items-center w-1/2">
                            <label for="date" class="block text-base"></label>
                            <input type="date" id="date" :disabled="true" v-model="date" class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"></input>
                        </div>
                        <p class="text-[1.2rem] mx-2"></p>
                        <div class="flex flex-row items-center w-1/2">
                            <label for="time" class="block text-base"></label>
                            <input type="time" id="time" :disabled="true" v-model="time" class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"></input>
                        </div>
                    </div> 
                </div>
                <div class="mt-3">
                    <p class="block text-base mb-2">Blood Pressure</p>
                    <div class="flex flex-row">
                        <div class="flex flex-row items-center w-1/2">
                            <label for="systolic" class="block text-base"></label>
                            <input type="number" min="0" id="systolic" v-model="systolic" class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter your systolic pressure"></input>
                        </div>
                        <p class="text-[1.2rem] mx-2">/</p>
                        <div class="flex flex-row items-center w-1/2">
                            <label for="diastolic" class="block text-base"></label>
                            <input type="number" min="0" id="diastolic" v-model="diastolic" class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter your diastolic pressure"></input>
                        </div>
                    </div> 
                </div>
                <div class="mt-3">
                    <label for="heartbeat" class="block text-base mb-2">Heartbeat</label>
                    <input type="number" min="0" id="heartbeat" v-model="heartbeat" class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter your heartbeat (per minute)"></input>
                </div>
                <div class="mt-3">
                    <label for="respiratory" class="block text-base mb-2">Respiratory Rate</label>
                    <input type="number" min="0" id="respiratory" v-model="respiratory" class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter your respiratory rate (per minute)"></input>
                </div>
                <div class="mt-3">
                    <label for="temperature" class="block text-base mb-2">Temperature</label>
                    <input type="number" min="0" step="0.01" id="temperature" v-model="temperature" class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter your temperature (&deg;C)"></input>
                </div>
                <div class="mt-2 text-red-500 font-semibold text-center">{{ error }}</div>
                <div class="flex flex-row justify-between gap-5">
                    <div class="flex mt-5 w-1/2">
                        <button class="border-2 border-blue-primary bg-blue-200 py-1 w-full rounded-md hover:bg-blue-100 hover:font-semibold" @click="closeUpdateRecordForm()">Cancel</button>
                    </div>
                    <div class="flex mt-5 w-1/2">
                        <button class="border-2 border-blue-primary bg-blue-300 py-1 w-full rounded-md hover:bg-blue-200 hover:font-semibold" type="submit">Update</button>
                    </div>
                </div>
            </div>
        </form>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex/dist/vuex.cjs.js';
import RecordDataValidations from '../services/RecordDataValidations';
import { GET_RECORDS_GETTER, GET_USER_TOKEN_GETTER } from '../store/constant';
import { TimeFormatter } from '../services/TimeFormatter';
import api from '../api';

export default {
    props: {
        recordNumber: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            date: '',
            time: '',
            systolic: null,
            diastolic: null,
            heartbeat: null,
            respiratory: null,
            temperature: null,
            error: ''
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
        const record = this.records[this.recordNumber]
        const datetime = TimeFormatter.splitISODate(record.time)
        this.date = datetime.date
        this.time = datetime.time
        this.systolic = record.bloodPressure.systolic
        this.diastolic = record.bloodPressure.diastolic
        this.heartbeat = record.heartbeat
        this.respiratory = record.respiratoryRate
        this.temperature = record.temperature
    },
    methods: {
        closeUpdateRecordForm() {
            this.$emit('close')
        },

        async onUpdateRecord() {
            // Validate input
            const recordDataValidation = new RecordDataValidations(
                this.date,
                this.time,
                this.systolic,
                this.diastolic,
                this.heartbeat,
                this.respiratory,
                this.temperature
            )
            if (!recordDataValidation.check()) {
                this.error = 'Record data is not complete!'
                return
            }
            else {
                this.error = ''
            }

            // Add record
            try {
                const response = await api.put("/record", {
                    time: TimeFormatter.toISODate(this.date, this.time),
                    bloodPressure: {
                        systolic: this.systolic,
                        diastolic: this.diastolic
                    },
                    heartbeat: this.heartbeat,
                    respiratoryRate: this.respiratory,
                    temperature: this.temperature
                }, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })

                this.error = ''
                this.closeUpdateRecordForm()
            }
            catch (err) {
                console.log(err)
                this.error = err.response.data.message
            }
        }
    }
}
</script>