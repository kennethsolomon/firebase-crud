class CourseManager {
    constructor() {
        // Do some stuff
    }
    writeUserData(userId, name, email, imageUrl) {
        firebase.database().ref('users/' + userId).set({
          username: name,
          email: email,
          profile_picture : imageUrl
        });
      }

}