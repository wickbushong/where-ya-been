const BACKEND_URL = 'localhost:3000';

function getCurrentList() {
    // NEEDS TO BE DYNAMIC URL
    fetch(BACKEND_URL+`businesses/1`)
        .then(response => response.json())
            .then(data => console.log(data));
}