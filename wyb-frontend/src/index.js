const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", fetchActiveVisits())

function fetchActiveVisits() {
    // NEEDS TO BE DYNAMIC URL
    fetch(BACKEND_URL+`/businesses/1`)
        .then(response => response.json())
            .then(data => createCurrentList(data["active_visits"]))
                .catch(err => console.log(err));
}

function appendVisitToCurrentList(visit) {
    let ul = document.querySelector("#current-list")
    let li = document.createElement("li")
    li.className = "list-group-item"
    li.setAttribute("data-visit-id", `${visit.id}`)
    li.setAttribute("data-user-id", `${visit.user.id}`)
    li.innerHTML = `${visit.user.first_name} ${visit.user.last_name}`
    let btn = document.createElement("button")
    btn.className = "btn btn-outline-danger btn-sm float-right"
    btn.innerHTML = "CHECK OUT"
    btn.addEventListener("click", e => checkOutVisit(e))
    li.appendChild(btn)
    ul.appendChild(li)
}

function createCurrentList(visits) {
    for (const visit of visits) {
        appendVisitToCurrentList(visit)
    }
}

function checkOutVisit(e) {
    debugger
}

