import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/skill';
  skill: any = {};

  constructor(private http: Http) {
    console.log('Skill Page');
    this.getData();
    this.getSkill();
  }

  ngOnInit() {
  }
  getData() {
    return this.http.get(this.apiUrl)
      .map((res: Response) => res.json());
  }
  getSkill() {
    this.getData().subscribe(data => {
      console.log(data);
      this.skill = {skills: data};
    });
  }
}
