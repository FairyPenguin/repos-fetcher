// Global Variables
const button = document.querySelector(".get-repos-btn");
const inputField = document.querySelector(".input-field");
const displayReposUi = document.querySelector(".repos-ui");

button.addEventListener("click", getRepos);

//get repos functionget-repos-btn
function getRepos() {
  // input validation

  if (inputField.value == "") {
    displayReposUi.innerHTML = ` <h3>⚠️ Enter a Github Username</h3>`;
    console.log("Enter Github Username");
  } else {
    //Fetch the github API
    fetch(`https://api.github.com/users/${inputField.value}/repos`)
      .then((response) => {
        return response.json();
      })
      .then((repos) => {
        console.log(repos);
        //Clear the UI
        displayReposUi.innerHTML = "";

        // Loop on the repos
        repos.forEach((repo) => {
          // Create the main div
          let mainDiv = document.createElement("div");
          // Add the repo name text to the main div

          let repoName = document.createTextNode(repo.name);

          mainDiv.appendChild(repoName);

          //Show repo url in the UI

          let repoURL = document.createElement("a");

          // Open repo url in a new tab
          repoURL.setAttribute("target", "_blank");

          let URLtext = document.createTextNode("Repo Link");

          repoURL.appendChild(URLtext);

          repoURL.href = `https://github.com/${inputField.value}/${repo.name}`;

          mainDiv.appendChild(repoURL);

          //Show repo stars count in the UI

          let repoStars = document.createElement("span");

          let starsNumText = document.createTextNode(
            `Stars: ${repo.stargazers_count} `
          );

          repoStars.appendChild(starsNumText);

          mainDiv.appendChild(repoStars);

          //Append the mainDiv to the UI

          displayReposUi.appendChild(mainDiv);

          //Add calss to the main div
          mainDiv.className = "main-repos-div";
          console.log(repo.name);
        });
      });
  }
}
