import Validations from "./Validations"

// Class to validate record data
export default class RecordDataValidations {
    // Record data consists of datetime, blood pressure, heartbeat, respiratory rate, and temperature
    constructor(date, time, systolic, diastolic, heartbeat, respiratory, temperature) {
        this.date = date
        this.time = time
        this.systolic = systolic
        this.diastolic = diastolic
        this.heartbeat = heartbeat
        this.respiratory = respiratory
        this.temperature = temperature
    }

    // Validate record data, return false if record data is not complete
    check() {
        return !Validations.isEmpty(this.date) && 
            !Validations.isEmpty(this.time) &&
            !Validations.notNumber(this.systolic) &&
            !Validations.notNumber(this.diastolic) &&
            !Validations.notNumber(this.heartbeat) &&
            !Validations.notNumber(this.respiratory) &&
            !Validations.notNumber(this.temperature)
    }
}