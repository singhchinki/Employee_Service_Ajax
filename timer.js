function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs" + date.getMinutes() + "Mins" + date.getSeconds() + "Secs";
}

function sessionExpire(){
    console.log("Session Expired at " + showTime());
}

console.log("A Triggering B at: " + showTime());
setTimeout(sessionExpire, 5000);
console.log("A Triggered B at:" + showTime() + " will execute after 5 seconds");