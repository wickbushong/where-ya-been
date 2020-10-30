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

    static fetchActiveVisits(businessId) {
        fetch(BACKEND_URL+`/businesses/${businessId}/visits`)
            .then(response => response.json())
                .then(data => createCurrentList(data))
                    .catch(err => console.log(err));
    }

    static fetchAll() {
        fetch(`http://localhost:3000/businesses`)
            .then(response => response.json())
                .then(businessList => this.populateSelect(businessList))
                    .catch(err => console.log(err))
    }

    static populateSelect(businessList) {
        for (const business of businessList) {
            this.appendOption(business)
        }
    }

    static appendOption(business) {
        let select = document.querySelector("select")
        let option = document.createElement("option")
        option.setAttribute("data-business-id", `${business.id}`)
        option.innerHTML = `${business.name} - ${business.location}`
        select.appendChild(option)
    }

    static select(e) {
        let select = e.target.querySelector("select")
        let selectedOption = select.item(select.selectedIndex)
        let businessId = selectedOption.dataset.businessId
        clearCurrentList()
        this.fetchActiveVisits(businessId)
        let list = document.querySelector("#current-list")
        list.setAttribute("data-business-id", `${businessId}`)
    }
}