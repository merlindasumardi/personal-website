import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {
  awards: any = {};

  constructor(private af: AngularFireDatabase) { }

  ngOnInit() {
    this.awards = this.af.list('awards').valueChanges();
    // this.awards.subscribe(data => {
    //   if (data.year === 2017) {

    //   }
    // });
  }

}
