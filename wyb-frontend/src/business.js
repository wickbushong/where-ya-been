class Business {
    constructor(business_object) {
        this.id = business_object["id"]
        this.name = business_object["name"]
        this.phone = business_object["phone"]
        this.email = business_object["email"]
        this.location = business_object["location"]
        this.users = business_object["users"]
        this.visits = business_object["visits"]
    }

    static fetchAll() {
        fetch(`http://localhost:3000/businesses`)
            .then(response => response.json())
                .then(businessList => this.populateSelect(businessList))
                    .catch(err => console.log(err))
    }

    static activateSelect() {
        let form = document.querySelector("#business-select-form")
        form.addEventListener("submit", e => {
            e.preventDefault
            let select = e.target.querySelector("select")
            let selectedOption = select.item(select.selectedIndex)
            let business = new Business({id: selectedOption.dataset.businessId})
            business.select()
            e.target.reset()
        })
    }
    
    static populateSelect(businessList) {
        for (const business of businessList) {
            const b = new Business(business)
            b.appendOptionToSelect()
        }
    }

    appendOptionToSelect() {
        let select = document.querySelector("select")
        let option = document.createElement("option")
        option.setAttribute("data-business-id", `${this.id}`)
        option.innerHTML = `${this.name} - ${this.location}`
        select.appendChild(option)
    }

    select() {
        clearCurrentList()
        this.fetchActiveVisits()
        let list = document.querySelector("#current-list")
        list.setAttribute("data-business-id", `${this.id}`)
        Report.activateTab()
        toggleTabs(document.querySelector("#visit-log-nav"))
    }

    fetchActiveVisits() {
        fetch(BACKEND_URL+`/businesses/${this.id}/visits`)
            .then(response => response.json())
                .then(data => createCurrentList(data))
                    .catch(err => console.log(err));
    }
}