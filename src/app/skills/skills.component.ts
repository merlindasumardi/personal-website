import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AppServiceService } from './../app-service.service';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skill: Observable<any[]>;
  success: boolean;
  warning: boolean;
  info: boolean;
  danger: boolean;

  constructor(private http: Http, private appService: AppServiceService, private af: AngularFireDatabase) {
    console.log('Skill Page');
  }

  ngOnInit() {
    this.skill = this.af.list('skill').valueChanges();
    this.skill.subscribe(data => {
    console.log(data);
    });
  }
}
