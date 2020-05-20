// Creating an object of XMLHttpRequest
const xhr = new XMLHttpRequest();
// Configuring a request, open takes 2 arguments first 'method' and second 'url'. Basically we have informed xhr which kind of request we want to send to address or to the end point.
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
// this will send the request. please check the network tab in developer tool options in the browser.
xhr.send();
