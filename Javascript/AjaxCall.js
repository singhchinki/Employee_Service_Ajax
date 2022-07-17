let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs " + date.getMinutes() + "Mins " + date.getSeconds() + "Secs";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        console.log("State Change Called.Ready State: "+ request.readyState + " Status: " + request.status);

        if(request.readyState === 4){
            if(request.status ===200 || request.status === 201){
                callback(request.responseText);
            }
            else if(request.status >= 400){
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
}

const getURL =  "http://127.0.0.1:3000/employees/";

function getUserDetails(data){
    console.log("Get User Data at : " + showTime() + " Data: " + data);
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX call to server at " + showTime());

const deleteURL = "http://localhost:3000/employees/4";
function deleteUserDetails(data){
    console.log("Delete User Data at : " + showTime() + " Data: " + data);
}
makeAJAXCall("DELETE", deleteURL, deleteUserDetails, false);
console.log("Made DELETE AJAX call to server at " + showTime());

const postURL =  "http://localhost:3000/employees";
const employeeData = {"name":"Hari", "salary":"25000"}
function addUser(data){
    console.log("Post User Data at : " + showTime() + " Data: " + data);
}
makeAJAXCall("POST", postURL, addUser, true, employeeData);
console.log("Made POST AJAX call to server at " + showTime());