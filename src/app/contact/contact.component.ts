import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/aboutme';
  contact: any = {};

  constructor(private http: Http) {
    
   }

   zoom: number = 17;
   lat: number = -6.192131;
   lng: number = 106.755973;

  ngOnInit() {
  }
}
