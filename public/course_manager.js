"use strict";
class CourseManager {

    constructor(theUser) {
        // this.user = user;

        // let email = this.user.email;

        // console.log(email);
        // console.log(user);

        $('#add-course').one("click", () => this.addUser());
    }
    addUser() {
        alert("Add User");
        
    }
}