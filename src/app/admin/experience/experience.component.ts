import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AppServiceService } from '../../app-service.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  exp: AngularFireList<any>;
  expForm: FormGroup;
  isAdd = false;
  isEdit = false;
  experience: any[];
  form: any = {};
  expData: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private appService: AppServiceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.exp = this.db.list('work');
    this.expData =  this.exp.snapshotChanges().pipe(
      map(actions => actions.map(a => ({
        key: a.payload.key, ...a.payload.val()
      })))
    );

    this.expData.subscribe(data => {
      this.experience = data;
    });
  }

  addExp() {
    this.isAdd = true;
    this.isEdit = false;
    this.expForm = this.formBuilder.group({
      'companyName': ['', Validators.required],
      'position': ['', Validators.required],
      'startDate': ['', Validators.required],
      'endDate':  ['', Validators.required],
      'description':  ['']
    });
  }

  submitExp() {
    this.appService.addWork(this.expForm.value).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.isAdd = false;
  }

  chooseExp(expData) {
    this.isEdit = true;
    this.isAdd = false;
    this.expForm = new FormGroup({
      'key':  new FormControl(expData.key),
      'companyName': new FormControl(expData.companyName, Validators.required),
      'position': new FormControl(expData.position, Validators.required),
      'startDate':  new FormControl(expData.startDate, Validators.required),
      'endDate':  new FormControl(expData.endDate, Validators.required),
      'description':  new FormControl(expData.description)
    });

  }
  editExp() {
    this.exp.update(this.expForm.value.key, {
      'companyName': this.expForm.value.companyName,
      'position': this.expForm.value.position,
      'startDate': this.expForm.value.startDate,
      'endDate': this.expForm.value.endDate,
      'description': this.expForm.value.description
    });

    this.isEdit = false;
  }

  removeExp(key) {
    this.exp.remove(key);
  }

}
