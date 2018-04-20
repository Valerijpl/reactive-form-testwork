import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

var moment = require('moment');

@Component({
  selector: 'main-page',
  templateUrl: '../components/MainPage.component.html',
  styleUrls: ['../app.component.css']
})
export class MainPage {
    message: string = 'Reactive Form For Event';
    formData: any;
    formDataOrigin: any;
    form: FormGroup;
    form2: FormGroup;
    isAdding: boolean;
    isEditing: boolean;
    selectedSession: any;
    sessionsIsUpdated: boolean = false;
    constructor(private route: ActivatedRoute,
    		    private fb: FormBuilder) {
        this.route.data.subscribe(data =>{
            this.formData = data.formData;
            this.formDataOrigin = data.formData;
            this.form = this.createMainForm();
        })
    }

    public getDateString(date){
        let a = new Date(date);
        let dateString = moment(date).format('YYYY-MM-DD HH:mm');
        return dateString;
    }

    public createMainForm(): FormGroup {

    let form = this.fb.group({
        name: [this.formData.name, Validators.required ],
        slug: [this.formData.slug, Validators.required ],
        isActive: [this.formData.is_active, Validators.required ],
        max_participants: [this.formData.max_participants, Validators.required ],
        min_participants: [this.formData.min_participants, Validators.required ],
    });

    return form;
}

deleteSession(session){
    let order = session.order;
    let index = this.formData.sessions.indexOf(session);
    this.formData.sessions.splice(index, 1);
    for (let i = 0;i < this.formData.sessions.length; i++){
        if (this.formData.sessions[i].order > order){
            this.formData.sessions[i].order =  this.formData.sessions[i].order - 1;
        }
    }
    this.sortByDefault();
    this.sessionsIsUpdated = true;
}

addSession(){
    this.form2  =  this.createSessionForm(null);
    this.isAdding = true;
}

updateSession(session){
    this.selectedSession = session;
    this.form2 = this.createSessionForm(session);
    this.isEditing = true;
}

public createSessionForm(entity): FormGroup {

let form = this.fb.group({
    name: [entity ? entity.name : null, Validators.required ],
    description: [entity ? entity.description : null],
    isActive : [entity ? entity.is_active : null],
    max_participants: [entity ? entity.max_participants : null, Validators.required ],
    min_participants: [entity ? entity.min_participants : null, Validators.required ],
});

return form;
}

cancelUpdate(){
    this.isAdding = false;
    this.isEditing = false;
}

saveSessionChanges(){
    if (this.isAdding){
        let session = new Object();
        let selectedSession = this.mapFormToSession(this.form2, session);
        selectedSession.order = this.formData.sessions.length + 1;
        this.formData.sessions.push(selectedSession);
        this.isAdding = false;
    } else {
        this.selectedSession = this.mapFormToSession(this.form2, this.selectedSession);
        this.isEditing = false;
    }
    this.sessionsIsUpdated = true;
}

mapFormToSession(form, session){
    let formValue = form.value;
    session.name = formValue.name;
    session.description = formValue.description;
    session.max_participants = formValue.max_participants;
    session.min_participants = formValue.min_participants;
    session.is_active = formValue.isActive;

    return session
}

moveUp(session){
    this.formData.sessions.find(x=> x.order == session.order - 1).order = session.order;
    session.order = session.order - 1;
    this.formData.sessions = this.sortByDefault();
    this.sessionsIsUpdated = true;
}

moveDown(session){
    this.formData.sessions.find(x=> x.order == session.order + 1).order = session.order;
    session.order = session.order + 1;
    this.formData.sessions = this.sortByDefault();
    this.sessionsIsUpdated = true;
}

sortByDefault(){
    let list = this.formData.sessions.sort((a: any, b: any) => {
        if (a.order > b.order){
            return 1;
        } else if (a.order < b.order){
            return -1;
        }
    })
    return list;
}

}
