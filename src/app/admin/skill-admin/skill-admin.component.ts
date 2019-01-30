import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-skill-admin',
  templateUrl: './skill-admin.component.html',
  styleUrls: ['./skill-admin.component.css']
})
export class SkillAdminComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  skillType = ['Technical', 'Managerial'];
  skillValue = ['fluent', 'good', 'fair', 'poor'];
  skillForm: FormGroup;
  skill: AngularFireList<any>;
  skillsData: Observable<any[]>;
  skills: any;

  isEdit = false;
  isAdd = false;

  image: any;
  constructor(private afStorage: AngularFireStorage, 
    private formBuilder: FormBuilder, 
    private skillService: AppServiceService ,
    private db: AngularFireDatabase) { }

  ngOnInit() {
    this.skill = this.db.list('skill');
    this.skillsData = this.skill.snapshotChanges().pipe(map(action => 
      action.map(a => ({
        key: a.payload.key, ...a.payload.val()
      }))));

      this.skillsData.subscribe(data => {
        this.skills = data;
      });
  }

  addSkill() {
    this.isAdd = true;
    this.isEdit = false;

    this.skillForm = new FormGroup({
      'skillName': new FormControl('', Validators.required),
      'skillCategory': new FormControl('', Validators.required),
      'skillScore': new FormControl('', Validators.required),
      'skillImage': new FormControl('')
    });
  }

  upload(event) {
    const id = this.skillForm.value.skillName ? this.skillForm.value.skillName.split(' ').join('') : 'noName';
    const referenceId = this.afStorage.ref(id);
    const task = referenceId.put(event.target.files[0]);
     // observe percentage changes
     this.uploadPercent = task.percentageChanges();
     // get notified when the download URL is available
     task.snapshotChanges().pipe(
         finalize(() => {
           this.downloadURL = referenceId.getDownloadURL();
           this.downloadURL.subscribe(data => {
            this.skillForm.value.skillImage = data;
          });
          } )
      )
     .subscribe();

  }

  submitForm() {
    this.skillService.addSkill(this.skillForm.value).subscribe(
      (response) => console.log(response),
      (error) => console.log(error));

      this.isAdd = false;
  }

  chooseSkill(skillData) {
    this.image = skillData.skillImage;
    this.isEdit = true;
    this.isAdd = false;
    this.skillForm = new FormGroup({
      'key' : new FormControl(skillData.key),
      'skillName': new FormControl(skillData.skillName, Validators.required),
      'skillCategory': new FormControl(skillData.skillCategory, Validators.required),
      'skillScore': new FormControl(skillData.skillScore, Validators.required),
      'skillImage': new FormControl(skillData.skillImage)
    });
  }

  editSkill() {
    this.skill.update(this.skillForm.value.key, {
      'skillName': this.skillForm.value.skillName,
      'skillCategory': this.skillForm.value.skillCategory,
      'skillScore': this.skillForm.value.skillScore,
      'skillImage': this.skillForm.value.skillImage ? this.skillForm.value.skillImage : this.image
    });

    this.isEdit = false;
  }

}
