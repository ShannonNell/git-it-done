var getUserRepos = function(user) {
    // format the github api url 
    // "weblink" + username on GitHub + "/repos" will enable different users to be inputed into the link
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //HTTP request to GitHub API and response//make request to the url
    fetch(apiUrl).then(function(response) {
        //format response as JSON to return another promise(then), whose callback function captures the actual data - the array
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

getUserRepos("ShannonNell");