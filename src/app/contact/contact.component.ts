import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact: any = {};

  constructor(private http: Http) {}

   zoom = 17;
   lat= -6.192131;
   lng = 106.755973;

  ngOnInit() {
  }
}
