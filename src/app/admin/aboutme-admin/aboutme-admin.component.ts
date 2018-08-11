import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AppServiceService } from '../../app-service.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-aboutme-admin',
  templateUrl: './aboutme-admin.component.html',
  styleUrls: ['./aboutme-admin.component.css']
})
export class AboutmeAdminComponent implements OnInit {
aboutMeForm: FormGroup;
dbData: any;
request: any;
uploadPercent: Observable<number>;
downloadURL: Observable<string>;


  constructor( private appService: AppServiceService, 
    private afStorage: AngularFireStorage, 
    private db: AngularFireDatabase) {
   }

  ngOnInit() {
    this.aboutMeForm = new FormGroup({
      'bio': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'phone': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'website': new FormControl('', Validators.required),
      'cv': new FormControl('')
    });
    this.onGetAboutMe();
  }

  upload(event) {
    console.log(event);
    const id = 'merlindaCV';
    const referenceId = this.afStorage.ref(id);
    const task = referenceId.put(event.target.files[0]);
     // observe percentage changes
     this.uploadPercent = task.percentageChanges();
     // get notified when the download URL is available
     task.snapshotChanges().pipe(
         finalize(() => this.downloadURL = referenceId.getDownloadURL() )
      )
     .subscribe();
    this.downloadURL = referenceId.getDownloadURL();
    this.downloadURL.subscribe(data => {
      console.log(data);
      this.aboutMeForm.value.cv = data;
    });
  }

  onGetAboutMe() {
    this.appService.getAboutMe().subscribe(data => {
     this.dbData = data.json();
     console.log(this.dbData);
     this.aboutMeForm = new FormGroup({
      'bio': new FormControl(this.dbData.bio, Validators.required),
      'name': new FormControl(this.dbData.name, Validators.required),
      'phone': new FormControl(this.dbData.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]),
      'email': new FormControl(this.dbData.email, [Validators.required, Validators.email]),
      'website': new FormControl(this.dbData.website, Validators.required),
      'cv': new FormControl(this.dbData.cv)
    });
    },
  error => {
    console.log(error);
  } );
  }

  onSubmit() {
    console.log(this.aboutMeForm.value);
    this.db.object('aboutMe').set({
      'bio': this.aboutMeForm.value.bio,
      'name': this.aboutMeForm.value.name,
      'phone': this.aboutMeForm.value.phone,
      'email': this.aboutMeForm.value.email,
      'website': this.aboutMeForm.value.website,
      'cv': this.aboutMeForm.value.cv ? this.aboutMeForm.value.cv : this.dbData.cv
    });
  }
}
