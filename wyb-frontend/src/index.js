const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", activateBusinessSelect(), activateTabs(), activateForm(), retrieveBusinesses())

function activateTabs() {
    let tabs = document.querySelectorAll(".nav-tab")
    for (const tab of tabs) {
        tab.addEventListener("click", e => {
            toggleTabs(e.target)
        })
    }
}

function activateForm() {
    let form = document.querySelector("#check-in-form")
    form.addEventListener("submit", e => {
        e.preventDefault
        Visit.postCheckIn(e.target)
        e.target.reset()
    })
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

function createCurrentList(visits) {
    for (const visit of visits) {
        new Visit(visit).appendVisitToCurrentList()
    }
}

function removeFromList(id) {
    const li = document.querySelector(`[data-visit-id="${id}"]`)
    li.remove()
}

function setBusiness(e) {
    let select = e.target.querySelector("select")
    let selectedOption = select.item(select.selectedIndex)
    let businessId = selectedOption.dataset.businessId
    clearCurrentList()
    Business.fetchActiveVisits(businessId)
    let list = document.querySelector("#current-list")
    list.setAttribute("data-business-id", `${businessId}`)
}

function toggleTabs(clickedTab) {
    let old = clickedTab.closest("ul").querySelector(".active")
    old.className = "nav-link"
    clickedTab.className += " active"
    let pageGroup = clickedTab.dataset.pageGroup
    let allPages = document.querySelectorAll(".container")
    for (const page of allPages) {page.style.display = "none"}
    let newPage = document.querySelector(`[data-page-group="${pageGroup}"].container`)
    newPage.style.display = "block"
}

function retrieveBusinesses() {
    Business.fetchAll()
}

function clearCurrentList() {
    const list = document.querySelector("#current-list")
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
}