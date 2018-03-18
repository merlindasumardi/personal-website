import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-educationexperience',
  templateUrl: './educationexperience.component.html',
  styleUrls: ['./educationexperience.component.css']
})
export class EducationexperienceComponent implements OnInit {
  // title: 'app work!';
  private apiUrl= {
    eduApi: environment.apiUrl + '/education',
    expApi: environment.apiUrl + '/work'
  };
  education: any = {};
  works: any = {};

  constructor(private http: Http) {
    console.log('Hello fellow user');
    this.getData();
    this.getEduWork();
  }

  ngOnInit() {
  }

  getData() {
    console.log(this.apiUrl.eduApi);
    const tempEdu = this.http.get(this.apiUrl.eduApi)
      .map((res: Response) => res.json());
    const tempExp = this.http.get(this.apiUrl.expApi)
      .map((res: Response) => res.json());
    return {
    tempEdu,
    tempExp
    };
  }

  getEduWork() {
    const edu = this.getData().tempEdu.subscribe(data => {
      this.education = data;
      console.log(this.education);
    });
    const work = this.getData().tempExp.subscribe(data => {
      console.log(data);
      this.works = data;
      console.log(this.works);
    });
  }

}
