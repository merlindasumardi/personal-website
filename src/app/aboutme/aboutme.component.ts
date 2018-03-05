import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {
  private apiUrl = environment.apiUrl + '/aboutme';
  aboutMe: any = {};

  constructor(private http: Http) {
    console.log('about me');
    this.getData();
    this.getAboutMe();
  }

  getData() {
    return this.http.get(this.apiUrl)
      .map((res: Response) => res.json());
  }

  getAboutMe() {
    this.getData().subscribe(data => {
      console.log(data);
      this.aboutMe = {abouts: data};
    });
  }

  ngOnInit() {
  }

}
