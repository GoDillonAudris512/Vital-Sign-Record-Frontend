<template>
    <main class="h-screen bg-gray-200">
        <Navigation></Navigation>
        <div class="px-10 py-5">
            <div class="relative w-full flex flex-col shadow-lg mb-6">
                <table class="w-auto rounded-lg">
                    <thead class="bg-blue-300">
                        <tr class="text-blue-secondary head-row">
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
                                <button>
                                    <i class="fa-solid fa-pencil"></i>
                                </button>
                                <button>
                                    <div class="bg-red-500 text-white rounded-md px-1">
                                        <i class="fa-solid fa-trash"></i>
                                    </div>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    <Popup v-if="showPopup" :message="popupMessage" @close="closePopup"></Popup>
</template>

<script>
import Navigation from '../components/Navigation.vue';
import Home from '../scripts/Home';

export default {
    ...Home
}
</script>

<style scoped>
.head-row {
    font-size: 1.15rem; 
}
</style>