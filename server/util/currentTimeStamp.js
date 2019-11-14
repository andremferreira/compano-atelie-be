module.exports = function currentTimeStamp(dateTime){
// ----------------------------------- RETURN DATE AND TIME FROM BACKEND ------------------------------------
    !dateTime ? date_ob = new Date() : date_ob = new Date(dateTime)
    // current date
// ----------------------------------- AJUST ZERO BEFORE SINGLE DIGIT ---------------------------------------
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = ("0" + date_ob.getHours()).slice(-2);
    // current minutes
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);
    // current seconds
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);
    // current millisenconds
    let millisenconds = ("00" + date_ob.getMilliseconds()).slice(-3);
    // current_timestamp
    let timeStamp = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${millisenconds}`
    // return of current date and time
    let jsonDate = { 
        "date":date,
        "month":month,
        "year":year,
        "hours":hours,
        "minutes":minutes,
        "seconds":seconds,
        "millisenconds":millisenconds,
        "timestamp":timeStamp
     }
    return jsonDate
}