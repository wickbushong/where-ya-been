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

    appendContactTo(list) {
        let li = document.createElement("li")
        li.className = "list-group-item"
        li.setAttribute("data-user-id", this.id)
        li.innerHTML = `${this.first_name} ${this.last_name} - `
        
        let collapse = document.createElement("div")
        collapse.className = "collapse"
        collapse.id = `collapse-${this.id}`
        collapse.innerHTML = `phone: ${this.phone}<br>email: ${this.email}`
        
        let button = document.createElement("button")
        button.className = "btn btn-primary btn-sm float-right"
        button.innerHTML = "INFO"
        button.type = "button"
        button.dataset.toggle = "collapse"
        button.dataset.target = `#collapse-${this.id}`
        button.setAttribute("aria-expanded", "false")
        button.setAttribute("aria-controls", `collapse-${this.id}`)

        li.appendChild(button)
        li.appendChild(collapse)
        list.appendChild(li)
    }

}