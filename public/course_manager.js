"use strict";
class CourseManager {

  constructor(theUser) {
    this.user = theUser;

    $('#add-course').click(() => this.addUser(theUser));


    firebase.database().ref('users/' + theUser + '/courses').once('value', (snapshot) => {
      let courses = snapshot.val();
      if (courses) {
        for (let id in courses) {
          let course = courses[id];
          this.insertCourseInTable(id, course);
        }
        componentHandler.upgradeElements(document.getElementById('course-table'));
      }
    });

  }

  addUser(theUser) {

    // if checkTextbox return false return nothing 
    if(!this.checkTextbox()){
      return;
    }
    // else proceed ->
    var id = (new Date()).getTime().toString(36);
    let course = {
      name: $('#course-title').val(),
      description: $('#course-description').val()
    };
    firebase.database().ref('users/' + theUser + '/courses/' + id).set({
      name: $('#course-title').val(),
      description: $('#course-description').val()
    });
    console.log("working adduser");
    $('#course-title').val("");
    $('#course-description').val("");
    this.insertCourseInTable(id, course);

  }

  // Check if the textbox is empty or not.
  checkTextbox() {
    if ($('#course-title').val() == "") {
      alert("please enter course title");
      $('#course-title').focus();
      return false;
    }
    if ($('#course-description').val() == "") {
      alert("please enter course description");
      $('#course-description').focus();
      return false;
    }
    return true;
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
    let list = $('#course-table-body').append(
      `<tr id="${id}">
            ${this.getMdlTableSelector()}
            <td class="mdl-data-table__cell--non-numeric course-title ">${ course.name }</td>
            <td class="mdl-data-table__cell--non-numeric course-description">${ course.description }</td>
            <td><i class="material-icons course-delete-row">delete</i></td>
          </tr>`);
    componentHandler.upgradeElements(list.children().last());
  }


}