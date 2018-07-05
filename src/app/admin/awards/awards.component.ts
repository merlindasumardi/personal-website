import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppServiceService } from '../../app-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {
  award: AngularFireList<any>;
  awardForm: FormGroup;
  isAdd = false;
  isEdit = false;
  awards: any[];
  awardData: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private appService: AppServiceService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.award = this.db.list('awards');
    this.awardData =  this.award.snapshotChanges().pipe(
      map(actions => actions.map(a => ({
        key: a.payload.key, ...a.payload.val()
      })))
    );

    this.awardData.subscribe(data => {
      this.awards = data;
      console.log(this.awards);
    });
  }

  addAward() {
    this.isAdd = true;
    this.isEdit = false;
    this.awardForm = this.formBuilder.group({
      'title': ['', Validators.required],
      'description': ['', Validators.required],
      'year': ['', Validators.required]
    });
  }

  submitAward() {
    this.appService.addAward(this.awardForm.value).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.isAdd = false;
  }

  chooseAward(awardData) {
    this.isEdit = true;
    this.isAdd = false;
    this.awardForm = new FormGroup({
      'key':  new FormControl(awardData.key),
      'title': new FormControl(awardData.title, Validators.required),
      'description': new FormControl(awardData.description, Validators.required),
      'year':  new FormControl(awardData.year, Validators.required)
    });

  }
  editAward() {
    console.log(this.awardForm.value);
    this.award.update(this.awardForm.value.key, {
      'title': this.awardForm.value.title,
      'description': this.awardForm.value.description,
      'year': this.awardForm.value.year
    });

    this.isEdit = false;
  }

  removeAward(key) {
    this.award.remove(key);
  }

}
