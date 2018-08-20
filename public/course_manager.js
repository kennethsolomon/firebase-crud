"use strict";
class CourseManager {

    constructor(theUser) {
        this.user = theUser;

        $('#add-course').click(() => this.addUser(theUser));
    }

    addUser(theUser, name, description) {
        name = document.getElementById("course-title").value;
        description = document.getElementById("course-description").value;
        firebase.database().ref('users/' + theUser).push({
            name: name,
            description: description
        });
    }

    viewUsers(theUser){
        firebase.database().ref('users/' + theUser).once('value').then((snapshot) => {
            let courses = snapshot.val();
            if (courses) {
              for (let id in courses) {
                let course = courses[id];
                this.insertCourseInTable(id, course);
              }
              componentHandler.upgradeElements(document.getElementById('course-table'));
              this.setupDeleteHandler();
              this.setupTitleChangeHandler();
            }
          });
    }
    getMdlTableSelector() {
        var mdlclass = "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select mdl-js-ripple-effect--ignore-events is-upgraded";
        return `<td>
          <label class="${mdlclass}" data-upgraded=",MaterialCheckbox,MaterialRipple">
            <input type="checkbox" class="mdl-checkbox__input">
            <span class="mdl-checkbox__focus-helper"></span>
            <span class="mdl-checkbox__box-outline">
              <span class="mdl-checkbox__tick-outline"></span>
            </span>
            <span class="mdl-checkbox__ripple-container mdl-js-ripple-effect mdl-ripple--center" data-upgraded=",MaterialRipple">
              <span class="mdl-ripple"></span>
            </span>
          </label>
        </td>`;
      }
      insertCourseInTable(id, course) {
        var list = $('#course-table-body').append(
          `<tr id="course_${id}">
            ${this.getMdlTableSelector()}
            <td class="mdl-data-table__cell--non-numeric course-title ">${ course.title }</td>
            <td class="mdl-data-table__cell--non-numeric course-description">${ course.description }</td>
            <td><i class="material-icons course-delete-row">delete</i></td>
          </tr>`);
        componentHandler.upgradeElements(list.children().last());
      }
    

}