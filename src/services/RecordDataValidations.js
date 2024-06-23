import Validations from "./Validations"

export default class RecordDataValidations {
    constructor(date, time, systolic, diastolic, heartbeat, respiratory, temperature) {
        this.date = date
        this.time = time
        this.systolic = systolic
        this.diastolic = diastolic
        this.heartbeat = heartbeat
        this.respiratory = respiratory
        this.temperature = temperature
    }

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