// Class to format time from ISO format to custom format, and vice-versa
export class TimeFormatter {
    // Return datetime in custom format from ISO format
    static fromISODate(isoDateString) {
        const date = new Date(isoDateString);
        
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');

        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    }

    // Create ISO format from separate date and time string
    static toISODate(dateString, timeString) {
        return `${dateString}T${timeString}:00.000Z`
    }

    // Split ISO format to separate date and time string
    static splitISODate(isoDateString) {
        const date = new Date(isoDateString);
        
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');

        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');

        return {
            date: `${year}-${month}-${day}`,
            time: `${hours}:${minutes}`
        }
    }
}