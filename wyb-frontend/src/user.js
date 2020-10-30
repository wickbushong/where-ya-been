class User {
    constructor(user_obj) {
        this.first_name  = user_obj["first_name"]
        this.last_name  = user_obj["last_name"]
        this.phone  = user_obj["phone"]
        this.email  = user_obj["email"]
        this.visits  = user_obj["visits"]
    }

    static fetchVisitsNear(date) {

    }
}