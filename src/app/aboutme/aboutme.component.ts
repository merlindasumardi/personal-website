import { AppServiceService } from './../app-service.service';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Response, Http } from '@angular/http';


@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {
  private apiUrl = environment.apiUrl + '/aboutme';
  aboutMe: any = {};

  constructor(private http: Http, private appService: AppServiceService) {
    console.log('about me');
  }

  ngOnInit() {
    this.appService.getAboutMe().subscribe(data => {
      this.aboutMe = data.json();
      console.log(this.aboutMe);
    },
    error => {
    console.log(error);
    });
  }

}
