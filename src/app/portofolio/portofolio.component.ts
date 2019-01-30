import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';

@Component({
  selector: 'app-portofolio',
  templateUrl: './portofolio.component.html',
  styleUrls: ['./portofolio.component.css']
})
export class PortofolioComponent implements OnInit {
  portofolio: any = {};
  languages: any = [];

  constructor(public db: AngularFireDatabase) { }

  ngOnInit() {
    this.portofolio = this.db.list('portofolio').valueChanges();
  }

}
