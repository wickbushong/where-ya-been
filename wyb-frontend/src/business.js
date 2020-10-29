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
}