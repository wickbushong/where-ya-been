const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", console.log("loaded"), activateBusinessSelect(), activateForm(), fetchBusinesses())

function fetchActiveVisits(businessId) {
    fetch(BACKEND_URL+`/businesses/${businessId}`)
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
        e.target.reset()
    })
}

function postCheckIn(e) {
    console.log("hit postCheckIn")
    const form = e.target
    const businessId = document.querySelector("#current-list").dataset.businessId
    const formData = {
        user: {
            first_name: form.querySelector("#first-name").value,
            last_name: form.querySelector("#last-name").value,
            email: form.querySelector("#input-email").value,
            phone: form.querySelector("#input-phone").value
        },
        business: {
            id: `${businessId}`
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
            .then(result => {
                appendVisitToCurrentList(result)
            })
                .catch(err => console.log(err))
}

function activateBusinessSelect() {
    let form = document.querySelector("#business-select-form")
    form.addEventListener("submit", e => {
        e.preventDefault
        setBusiness(e)
        e.target.reset()
        // SWITCH TO LOG TAB
    })
}

function setBusiness(e) {
    let select = e.target.querySelector("select")
    let selectedOption = select.item(select.selectedIndex)
    let businessId = selectedOption.dataset.businessId
    clearCurrentList()
    fetchActiveVisits(businessId)
    let list = document.querySelector("#current-list")
    list.setAttribute("data-business-id", `${businessId}`)
}

function toggleTabs() {
    let old = event.target.closest("ul").querySelector(".active")
    old.className = "nav-link"
    event.target.className += " active"
    let pageGroup = event.target.dataset.pageGroup
    let allPages = document.querySelectorAll(".container")
    for (const page of allPages) {page.style.display = "none"}
    let newPage = document.querySelector(`[data-page-group="${pageGroup}"].container`)
    newPage.style.display = "block"
}

function fetchBusinesses() {
    fetch(`http://localhost:3000/businesses`)
    .then(response => response.json())
        .then(businessList => populateBusinessSelect(businessList))
            .catch(err => console.log(err))
}

function populateBusinessSelect(businessList) {
    for (const business of businessList) {
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

function clearCurrentList() {
    const list = document.querySelector("#current-list")
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
}