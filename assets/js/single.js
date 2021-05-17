var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    console.log(repo);
    // var to hold query
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    // request
    fetch(apiUrl).then(function(response) {
        //request successful
        if (response.ok) {
            response.json().then(function(data) {
                //pass response data to dom function
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
};

var displayIssues = function(issues) {
    //if no open issues, alert user
    if (issues.length ===0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    //loop through all repo issues and label issue or pull request
    for (var i = 0; i < issues.length; i++) {
        //create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        
        //append to container
        issueEl.appendChild(typeEl);

        //append this entire issue onto the page
        issueContainerEl.appendChild(issueEl);
    }
};

getRepoIssues("ShannonNell/snell-travel");