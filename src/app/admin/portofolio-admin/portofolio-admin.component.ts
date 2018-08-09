import { AngularFireStorage } from 'angularfire2/storage';
import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppServiceService } from '../../app-service.service';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-portofolio-admin',
  templateUrl: './portofolio-admin.component.html',
  styleUrls: ['./portofolio-admin.component.css']
})
export class PortofolioAdminComponent implements OnInit {
  porto: AngularFireList<any>;
  portoForm: FormGroup;
  isAdd = false;
  isEdit = false;
  portofolio: any[];
  portoData: Observable<any[]>;

  imageURL1: Observable<string>;
  imageURL2: Observable<string>;
  imageURL3: Observable<string>;
  uploadPercent1: Observable<number>;
  uploadPercent2: Observable<number>;
  uploadPercent3: Observable<number>;

  constructor(private db: AngularFireDatabase, private appService: AppServiceService, 
    private formBuilder: FormBuilder, private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.porto = this.db.list('portofolio');
    this.portoData =  this.porto.snapshotChanges().pipe(
      map(actions => actions.map(a => ({
        key: a.payload.key, ...a.payload.val()
      })))
    );

    this.portoData.subscribe(data => {
      this.portofolio = data;
      console.log(this.portofolio);
    });
  }

  addPorto() {
    this.isAdd = true;
    this.isEdit = false;
    this.portoForm = this.formBuilder.group({
      'projectName': ['', Validators.required],
      'github': ['', Validators.required],
      'year': ['', Validators.required],
      'language': ['', Validators.required],
      'description': [''],
      'image1': [''],
      'image2': [''],
      'image3': ['']
    });
  }

  upload(event, imageName: string) {
    const id = this.portoForm.value.projectName ? this.portoForm.value.projectName.split(' ').join('').concat('_' + imageName) : 'noName_'+ imageName;

    const referenceId = this.afStorage.ref(id);
    const task = referenceId.put(event.target.files[0]);

    //observe percentage
    if (imageName === 'image1') {
      this.uploadPercent1 = task.percentageChanges();
    } else if (imageName === 'image2') {
      this.uploadPercent2 = task.percentageChanges();
    } else if (imageName === 'image3') {
      this.uploadPercent3 = task.percentageChanges();
    }

    //get downloadURL
    task.snapshotChanges().pipe(
      finalize(() => {
        console.log(imageName);
        if (imageName === 'image1') {
          this.imageURL1 = referenceId.getDownloadURL();
          console.log('halo',this.imageURL1);
          this.imageURL1.subscribe(data => {
            console.log(data);
            console.log(this.portoForm.value)
            this.portoForm.value.image1 = data;
          });
        } else if (imageName === 'image2') {
          this.imageURL2 = referenceId.getDownloadURL();
          this.imageURL2.subscribe(data => {
            console.log(data);
            this.portoForm.value.image2 = data;
          });
        } else if (imageName === 'image3') {
          this.imageURL3 = referenceId.getDownloadURL();
          this.imageURL3.subscribe(data => {
            console.log(data);
            this.portoForm.value.image3 = data;
          });
        }

      })
    ).subscribe();
    console.log(this.portoForm.value);
  }
  submitPorto() {
    this.portoForm.value.language = this.portoForm.value.language.split(",");
    this.appService.addPortofolio(this.portoForm.value).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });

    this.isAdd = false;
  }
  removePorto(key) {
    this.porto.remove(key);
  }
  choosePorto(data) {
    this.imageURL1 = data.image1;
    this.imageURL2 = data.image2;
    this.imageURL3 = data.image3;
    this.isEdit = true;
    this.isAdd = false;
    this.portoForm = this.formBuilder.group({
      'key': [data.key],
      'projectName': [data.projectName, Validators.required],
      'github': [data.github, Validators.required],
      'year': [data.year, Validators.required],
      'language': [data.language, Validators.required],
      'description': [data.description],
      'image1': [data.image1],
      'image2': [data.image2],
      'image3': [data.image3]
    });
  }
  editPorto() {
    console.log(this.portoForm.value);
    this.porto.update(this.portoForm.value.key, {
      'projectName': this.portoForm.value.projectName,
      'github': this.portoForm.value.github,
      'year': this.portoForm.value.year,
      'language': this.portoForm.value.language,
      'description': this.portoForm.value.description,
      'image1': this.portoForm.value.image1 ? this.portoForm.value.image1 : this.imageURL1,
      'image2': this.portoForm.value.image2 ? this.portoForm.value.image2 : this.imageURL2,
      'image3': this.portoForm.value.image3 ? this.portoForm.value.image3 : this.imageURL3
    });

    this.isEdit = false;
  }

}
