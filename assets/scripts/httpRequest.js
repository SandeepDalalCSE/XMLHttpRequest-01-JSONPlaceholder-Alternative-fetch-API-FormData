const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
  // adding a promise to this async code
  const promise = new Promise((resolve, reject) => {
    // Creating an object of XMLHttpRequest
    const xhr = new XMLHttpRequest();
    // Configuring a request, open takes 2 arguments first 'method' and second 'url'. Basically we have informed xhr which kind of request we want to send to address or to the end point.
    xhr.open(method, url);
    // this will send the request. please check the network tab in developer tool options in the browser.

    // xhr.send();
    xhr.send(JSON.stringify(data));

    // xhr.responseType = "json"; // instead of using parse method, we can also define our response type initially.

    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error("something went wrong!"));
      }
    };

    // Handling error
    xhr.onerror = function() {
      reject(new Error("Failed to send a request"));
      console.log(xhr.response);
      console.log(xhr.status);
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
  try {
    const respnseData = await sendHttpRequest("GET", "https://jsonplaceholder.typicode.com/pos");
    const listOfPosts = JSON.parse(respnseData); // Data parsing from JSON to JS Object using JSON.parse() helper method.
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    console.log(error);
  }
}

// fetchPosts();
// fetchButton.addEventListener('click',() => {
//   fetchPosts();
// })
fetchButton.addEventListener("click", fetchPosts);

form.addEventListener("submit", event => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;

  createPost(enteredTitle, enteredContent);
});

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId
  };

  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}

// createPost("dummyTitle", "dummyBody");

postList.addEventListener("click", () => {
  if (event.target.tagName === "BUTTON") {
    console.log("clicked on button!");
    const postId = event.target.closest("li").id;
    console.log(postId);
    sendHttpRequest("DELETE", `https://jsonplaceholder.typicode.com/posts/${postId}`); // check delete request status in network tab
  }
});
