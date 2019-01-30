import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../app-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  edu: AngularFireList<any>;
  eduForm: FormGroup;
  isAdd = false;
  isEdit = false;
  educations: any[];
  form: any = {};
  eduData: Observable<any[]>;

  constructor(private db: AngularFireDatabase, private appService: AppServiceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.edu = this.db.list('education');
    this.eduData =  this.edu.snapshotChanges().pipe(
      map(actions => actions.map(a => ({
        key: a.payload.key, ...a.payload.val()
      })))
    );

    this.eduData.subscribe(data => {
      this.educations = data;
    });
  }

  addEdu() {
    this.isAdd = true;
    this.isEdit = false;
    this.eduForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'school': new FormControl('', Validators.required),
      'yearin':  new FormControl('', Validators.required),
      'yearout':  new FormControl('', Validators.required),
      'gpa' :  new FormControl(''),
      'description':  new FormControl('')
    });
  }

  submitEdu() {
    this.appService.addEducation(this.eduForm.value).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.isAdd = false;
  }

  chooseEdu(eduData) {
    this.isEdit = true;
    this.isAdd = false;
    this.eduForm = new FormGroup({
      'key':  new FormControl(eduData.key),
      'title': new FormControl(eduData.title, Validators.required),
      'school': new FormControl(eduData.school, Validators.required),
      'yearin':  new FormControl(eduData.yearin, Validators.required),
      'yearout':  new FormControl(eduData.yearout, Validators.required),
      'gpa' :  new FormControl(eduData.gpa),
      'description':  new FormControl(eduData.description)
    });

  }
  editEdu() {
    this.edu.update(this.eduForm.value.key, {
      'title': this.eduForm.value.title,
      'school': this.eduForm.value.school,
      'yearin': this.eduForm.value.yearin,
      'yearout': this.eduForm.value.yearout,
      'gpa': this.eduForm.value.gpa,
      'description': this.eduForm.value.description
    });

    this.isEdit = false;
  }

  removeEdu(key) {
    this.edu.remove(key);
  }

}
