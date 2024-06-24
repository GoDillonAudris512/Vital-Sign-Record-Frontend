import { SET_RECORDS_MUTATION } from "../../constant";

export default {
    // Sort and format records given, then put it to state
    [SET_RECORDS_MUTATION](state, payload) {
        // Reset records state
        state.records = []
        
        // Sort records given
        const sortedRecords = payload.records.sort((a, b) =>
            new Date(b.time) - new Date(a.time)
        )

        // For each record, format it and put it to state
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