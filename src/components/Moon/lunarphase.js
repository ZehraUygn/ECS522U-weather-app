export const getJulianDate = (date = new Date()) => {
    const time = date.getTime();
    const tzoffset = date.getTimezoneOffset()
    
    return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
}

export const LUNAR_MONTH = 29.530588853;const getLunarAge = (date = new Date()) => {
    const percent = getLunarAgePercent(date);
    const age = percent * LUNAR_MONTH; 
    
    return age;
}

export const getLunarAgePercent = (date = new Date()) => {
    return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
}

export const normalize = value => {
    value = value - Math.floor(value);
    if (value < 0)
      value = value + 1 
      
    return value;
}

export const getLunarPhase = (date = new Date()) => {
    const age = getLunarAge(date);  if (age < 1.84566)
      return "New";
    else if (age < 5.53699)
      return "Waxing Crescent";
    else if (age < 9.22831)
      return "First Quarter";
    else if (age < 12.91963)
      return "Waxing Gibbous";
    else if (age < 16.61096)
      return "Full";
    else if (age < 20.30228)
      return "Waning Gibbous";
    else if (age < 23.99361)
      return "Last Quarter";
    else if (age < 27.68493)
      return "Waning Crescent"; 
    return "New";
}

export const isWaxing = (date = new Date()) => {
    const age = getLunarAge(date);
    return age <= 14.765;
  }
export const isWaning = (date = new Date()) => {
    const age = getLunarAge(date);
    return age > 14.765;
}

export const toEmoji = {"New":"🌑", "Waxing Crescent":"🌒","First Quarter":"🌓","Waxing Gibbous":"🌔","Full":"🌕","Waning Gibbous":"🌖","Last Quarter":"🌗","Waning Crescent":"🌘"};