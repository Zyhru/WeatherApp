console.log("Start");



function loginUser(email, password, callback) {
    setTimeout(() => {
        console.log("We retrieved the data");
        callback({userEmail : email});
    }, 5000);

}


function getUserVideos(email) {
    setTimeout(() => {
        
    })
}


const user = loginUser('sdkjs@aol.com', 2133, user => {
    console.log(user);
});


console.log("End");

