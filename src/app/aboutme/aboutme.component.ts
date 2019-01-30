import { AppServiceService } from './../app-service.service';
import { Component, OnInit } from '@angular/core';
import { Response, Http } from '@angular/http';


@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {
  aboutMe: any = {};

  constructor(private http: Http, private appService: AppServiceService) {
    console.log('about me');
  }

  ngOnInit() {
    this.appService.getAboutMe().subscribe(data => {
      this.aboutMe = data.json();
    },
    error => {
    console.log(error);
    });
  }

}
