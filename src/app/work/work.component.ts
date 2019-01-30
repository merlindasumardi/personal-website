import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  works: any;
  workReverse: any;

  constructor(private af: AngularFireDatabase) { }

  ngOnInit() {
    this.works = this.af.list('work').valueChanges();
    this.works.subscribe(data => {
      this.workReverse = data.reverse();
    });
  }

}
