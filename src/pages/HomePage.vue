<template>
    <main class=" bg-gray-200">
        <Navigation></Navigation>
        <div class="px-10 py-5">
            <div class="flex flex-row justify-between items-center pb-5 px-2">
                <div class="text-blue-secondary font-semibold text-2xl">
                    Your Records
                </div>
                <button @click="openAddRecordForm()">
                    <div class="bg-blue-primary text-white font-md-sm px-2 py-1 rounded-lg hover:bg-blue-300">
                        Add Record
                        <i class="fa-solid fa-plus ml-1"></i>
                    </div>
                </button>
            </div>
            <div class="relative w-full flex flex-col shadow-lg mb-6">
                <table class="w-auto rounded-lg">
                    <thead class="bg-blue-300">
                        <tr class="text-blue-secondary font-md-sm">
                            <th class="text-md px-3 py-2">No.</th>
                            <th class="text-md px-3 py-2">Time</th>
                            <th class="text-md px-3 py-2">Blood Pressure (mmHg)</th>
                            <th class="text-md px-3 py-2">Heartbeat (per minute)</th>
                            <th class="text-md px-3 py-2">Respiratory Rate (per minute)</th>
                            <th class="text-md px-3 py-2">Temperature (&deg;C)</th>
                            <th class="text-md px-3 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="record of records" :key="record.number" class="text-center duration-300 hover:bg-blue-200">
                            <th class="text-md px-3 py-2 text-blue-secondary">{{ record.number }}</th>
                            <td class="text-md px-3 py-2">{{ formatTime(record.time) }}</td>
                            <td class="text-md px-3 py-2">{{ record.bloodPressure.systolic }}/{{ record.bloodPressure.diastolic }}</td>
                            <td class="text-md px-3 py-2">{{ record.heartbeat }}</td>
                            <td class="text-md px-3 py-2">{{ record.respiratoryRate }}</td>
                            <td class="text-md px-3 py-2">{{ record.temperature }}</td>
                            <td class="flex gap-5 justify-center mt-1 px-3 py-2">
                                <button @click="updateRecord(record.number)">
                                    <i class="fa-solid fa-pencil"></i>
                                </button>
                                <button @click="deleteRecord(record.number)">
                                    <div class="bg-red-500 text-white rounded-md px-1">
                                        <i class="fa-solid fa-trash"></i>
                                    </div>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr v-if="noRecords" class="text-center duration-300 hover:bg-blue-200">
                            <th class="text-md px-3 py-2 text-blue-secondary">...</th>
                            <td class="text-md px-3 py-2">...</td>
                            <td class="text-md px-3 py-2">...</td>
                            <td class="text-md px-3 py-2">...</td>
                            <td class="text-md px-3 py-2">...</td>
                            <td class="text-md px-3 py-2">...</td>
                            <td class="text-md px-3 py-2">...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    <AddRecordForm v-if="showAddRecordForm" @close="closeAddRecordForm"></AddRecordForm>
    <UpdateRecordForm v-if="showUpdateRecordForm" @close="closeUpdateRecordForm" :recordNumber="updateRecordNumber"></UpdateRecordForm>
    <Popup v-if="showPopup" :message="popupMessage" @close="closePopup"></Popup>
</template>

<script>
import AddRecordForm from '../components/AddRecordForm.vue';
import Navigation from '../components/Navigation.vue';
import UpdateRecordForm from '../components/UpdateRecordForm.vue';
import Home from '../scripts/Home';

export default {
    ...Home
}
</script>

<style scoped>
.font-md-sm {
    font-size: 1.15rem; 
}
</style>