const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", console.log("loaded"), fetchActiveVisits())

function fetchActiveVisits() {
    console.log("hit fetchActiveVisits")
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
    btn.addEventListener("click", e => postCheckOut(e))
    li.appendChild(btn)
    ul.appendChild(li)
}

function createCurrentList(visits) {
    for (const visit of visits) {
        appendVisitToCurrentList(visit)
    }
}

function postCheckOut(e) {
    console.log("hit postCheckout")
    const visitId = e.target.parentElement.dataset.visitId
    fetch(`http://localhost:3000/visits/${visitId}`, {
            method: 'PATCH',
            headers:  {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({time_out: "true", id: `${visitId}`})
        })
        .then(response => response.json())
            .then(result => console.log(removeFromList(result["id"])))
                .catch(err => console.log(err))
}

function removeFromList(id) {
    const li = document.querySelector(`[data-visit-id="${id}"]`)
    li.remove()
}

function activateForm() {
    console.log("hit activateForm")
    let form = document.querySelector("#check-in-form")
    form.addEventListener("submit", e => {
        e.preventDefault
        postCheckIn(e)
    })
}

function postCheckIn(e) {
    console.log("hit postCheckIn")
    const form = e.target
    const formData = {
        user: {
            first_name: form.querySelector("#first-name").value,
            last_name: form.querySelector("#last-name").value,
            email: form.querySelector("#input-email").value,
            phone: form.querySelector("#input-phone").value
        },
        business: {
            // DESPERATELY NEEDS TO BE DYNAMIC
            id: "1"
        }
    }
    fetch(`http://localhost:3000/visits`, {
            method: 'POST',
            headers:  {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
            .then(result => console.log(result))
                .catch(err => console.log(err))
}


activateForm()

function toggleTabs() {
    let old = event.target.closest("ul").querySelector(".active")
    old.className = "nav-link"
    event.target.className += " active"
}

function fetchBusinesses() {
    fetch(`http://localhost:3000/businesses`)
    .then(response => response.json())
        .then(result => populateBusinessSelect(result))
            .catch(err => console.log(err))
}

function populateBusinessSelect(result) {
    for (const business of result) {
        appendBusinessOption(business)
    }
}

function appendBusinessOption(business) {
    let select = document.querySelector("select")
    let option = document.createElement("option")
    option.setAttribute("data-business-id", `${business.id}`)
    option.innerHTML = `${business.name} - ${business.location}`
    select.appendChild(option)
}