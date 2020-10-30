class User {
    constructor(user_obj) {
        this.id = user_obj["id"]
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
        let select = document.querySelector("#user-select-field")
        for (const user of userList) {
            const u = new User(user)
            u.appendOptionTo(select)
        }
    }
    
    appendOptionTo(select) {
        let option = document.createElement("option")
        option.setAttribute("data-user-id", this.id)
        option.innerHTML = `${this.first_name} ${this.last_name} - ${this.phone}`
        select.appendChild(option)
    }
}