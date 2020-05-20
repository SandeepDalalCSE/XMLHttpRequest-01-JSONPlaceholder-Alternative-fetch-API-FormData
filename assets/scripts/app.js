// Creating an object of XMLHttpRequest
const xhr = new XMLHttpRequest();
// Configuring a request, open takes 2 arguments first 'method' and second 'url'. Basically we have informed xhr which kind of request we want to send to address or to the end point.
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
// this will send the request. please check the network tab in developer tool options in the browser.
xhr.send();

// xhr.responseType = "json"; // instead of using parse method, we can also define our response type initially.

xhr.onload = function() {
  console.log(xhr); // Consoling complete object.
  console.log(xhr.response); // Consoling only response key in xhr object. Note: response is in JSON (JavaScript Object Notation) format. To use this data we need to convert it first into JavaScript string/object.
  const listOfPosts = JSON.parse(xhr.response); // Data parsing from JSON to JS Object using JSON.parse() helper method.
  console.log(listOfPosts);
};
