export default class util{
    static formatTime(timeStr) {
        const time = new Date(timeStr * 1000);
    
        let hours = time.getHours();
        let minutes = time.getMinutes();
    
        // Add leading zero to single-digit minutes
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
    
        // Determine AM/PM
        let ampm = "AM";
        if (hours >= 12) {
            if(hours!=12){hours -= 12;}
            ampm = "PM";
        }
    
        // Format time string
        const formattedTime = `${hours}:${minutes} ${ampm}`;
    
        return formattedTime;
    }

    static formatHourTime(timeStr)
    {
        const time = new Date(timeStr * 1000)
        let hours = time.getHours();
        let ampm = "AM";
        if (hours>12)
        {
            hours -= 12;
            ampm = "PM";
        }
        const formattedTime = `${hours}${ampm}`;
    
        return formattedTime;
    }
    
    static getTimeDelta(time1, time2) {
        let diff = new Date(time1).getTime() - new Date(time2).getTime();
        let hours = Math.floor(diff / 3600);
        let minutes = Math.floor((diff % 3600) / 60);
    
        return hours + "h " + minutes + "m";
    }
}