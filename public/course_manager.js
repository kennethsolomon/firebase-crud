"use strict";
class CourseManager {

    constructor(theUser) {
         this.user = theUser;

        // let email = this.user.email;

        // console.log(email);
        // console.log(user);
        
        $('#add-course').click(() => this.addUser(theUser));
    }
    addUser(theUser, name, description) {
        name = document.getElementById("course-title").value;
        description = document.getElementById("course-description").value;
        firebase.database().ref('users/' + theUser).set({
            name : name,
            description : description
        });
      }
        
        // writeUserData((userId, name, email, imageUrl) =>{
        //     alert("Add User");
        //     var database = firebase.database();
        //     firebase.database().ref('users/' + userId).set({
        //       username: name,
        //       email: email,
        //       profile_picture : imageUrl
        //     });
        //   )};
    
}