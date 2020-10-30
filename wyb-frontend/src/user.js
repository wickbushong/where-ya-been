class User {
    constructor(user_obj) {
        this.first_name  = user_obj["first_name"]
        this.last_name  = user_obj["last_name"]
        this.phone  = user_obj["phone"]
        this.email  = user_obj["email"]
        this.visits  = user_obj["visits"]
    }

    static fetchAll() {
        fetch(`http://localhost:3000/users`)
            .then(response => response.json())
                .then(result => this.populateSelect(result))
                    .catch(err => console.log(err))
    }

    static populateSelect(userList) {
        for (const user of userList) {
            const u = new User(user)
            u.appendOptionToSelect()
        }
    }
    
    appendOptionToSelect() {
        let select = document.querySelector("#user-select-field")
        let option = document.createElement("option")
        option.
    }
}