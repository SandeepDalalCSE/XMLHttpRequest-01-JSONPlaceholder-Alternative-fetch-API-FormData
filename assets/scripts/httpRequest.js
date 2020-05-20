const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");

function sendHttpRequest(method, url) {
  // adding a promise to this async code
  const promise = new Promise((resolve, reject) => {
    // Creating an object of XMLHttpRequest
    const xhr = new XMLHttpRequest();
    // Configuring a request, open takes 2 arguments first 'method' and second 'url'. Basically we have informed xhr which kind of request we want to send to address or to the end point.
    xhr.open(method, url);
    // this will send the request. please check the network tab in developer tool options in the browser.
    xhr.send();

    // xhr.responseType = "json"; // instead of using parse method, we can also define our response type initially.

    xhr.onload = function() {
      resolve(xhr.response);
    };
  });
  return promise;
}

// function fetchPosts() {
//   sendHttpRequest("GET", "https://jsonplaceholder.typicode.com/posts").then(resData => {
//     const listOfPosts = JSON.parse(resData); // Data parsing from JSON to JS Object using JSON.parse() helper method.
//     for (const post of listOfPosts) {
//       const postEl = document.importNode(postTemplate.content, true);
//       postEl.querySelector("h2").textContent = post.title.toUpperCase();
//       postEl.querySelector("p").textContent = post.body;
//       listElement.append(postEl);
//     }
//   });
// }

// fetchPosts();

// an alternative to fetch post using async and await.
async function fetchPosts() {
  const respnseData = await sendHttpRequest("GET", "https://jsonplaceholder.typicode.com/posts");
  const listOfPosts = JSON.parse(respnseData); // Data parsing from JSON to JS Object using JSON.parse() helper method.
  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector("h2").textContent = post.title.toUpperCase();
    postEl.querySelector("p").textContent = post.body;
    listElement.append(postEl);
  }
}

fetchPosts();
