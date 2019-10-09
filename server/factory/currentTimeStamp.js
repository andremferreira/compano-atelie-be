function currentTimeStamp(){
// ----------------------------------- RETURN DATE AND TIME FROM BACKEND ------------------------------------
    let date_ob = new Date();
    // current date
// ----------------------------------- AJUST ZERO BEFORE SINGLE DIGIT ---------------------------------------
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    // current seconds
    let seconds = date_ob.getSeconds();
    // current millisenconds
    let millisenconds = date_ob.getMilliseconds ();
    // current_timestamp
    let timeStamp = toString(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + "." + millisenconds)
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

module.exports [currentTimeStamp]