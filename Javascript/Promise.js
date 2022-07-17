let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs " + date.getMinutes() + "Mins " + date.getSeconds() + "Secs";
}

function makePromiseCall(methodType, url, async = true, data = null){
    return new Promise(function(resolve, reject){
        let request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            console.log("State Change Called.Ready State: "+ request.readyState + " Status: " + request.status);

            if(request.readyState === 4){
                if(request.status ===200 || request.status === 201){
                    resolve(request.responseText);
                }
                else if(request.status >= 400){
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    });
                    console.log("Handle 400 Client Error or 500 Server Error at " + showTime());
                }
            }
        }
        request.open(methodType, url, async);
        if(data){
            //console.log(JSON.stringify(data));
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(data));
        }
        else{
            request.send();
        }
        console.log(methodType + " Request send to Server at " + showTime());
    });
}

const getURL = "http://127.0.0.1:3000/employees/10";

makePromiseCall("GET", getURL, true) 
    .then(responseText =>{
        console.log("Get User Data " + responseText);
    }).catch(error => console.log("Get Error Status " + JSON.stringify(error)));
console.log("Made GET AJAX call to server at " + showTime());

const deleteURL =  "http://localhost:3000/employees/12";

makePromiseCall("DELETE", deleteURL, false) 
    .then(responseText =>{
        console.log("Delete User Data " + responseText);
    }).catch(error => console.log("Get Error Status " + JSON.stringify(error)));
console.log("Made DELETE AJAX call to server at " + showTime());

const postURL =  "http://localhost:3000/employees";
const employeeData = {"name":"curry", "salary":"25000"}
makePromiseCall("POST", postURL, true, employeeData) 
    .then(responseText =>{
        console.log("Add User Data " + responseText);
    }).catch(error => console.log("Get Error Status " + JSON.stringify(error)));
console.log("Made POST AJAX call to server at " + showTime());