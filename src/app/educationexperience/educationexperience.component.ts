import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-educationexperience',
  templateUrl: './educationexperience.component.html',
  styleUrls: ['./educationexperience.component.css']
})
export class EducationexperienceComponent implements OnInit {
  education: any = {};

  constructor(private http: Http, private af: AngularFireDatabase) {
  }

  ngOnInit() {
    this.education = this.af.list('education').valueChanges();
  }

}
