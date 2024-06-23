import { SET_RECORDS_MUTATION } from "../../constant";

export default {
    [SET_RECORDS_MUTATION](state, payload) {
        state.records = []
        
        const sortedRecords = payload.records.sort((a, b) =>
            new Date(b.time) - new Date(a.time)
        )

        let i = 1
        for (const record of sortedRecords) {
            state.records.push({
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
    }
}