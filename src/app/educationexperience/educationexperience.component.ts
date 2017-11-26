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
    eduApi: 'http://localhost:3000/education',
    expApi: 'http://localhost:3000/work'
  };
  education: any = {};
  work: any = {};

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
      this.education = {edus: data};
      console.log(this.education);
    });
    const work = this.getData().tempExp.subscribe(data => {
      console.log(data);
      this.work = {works: data};
    });
  }

}
