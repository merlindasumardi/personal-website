import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-portofolio-admin',
  templateUrl: './portofolio-admin.component.html',
  styleUrls: ['./portofolio-admin.component.css']
})
export class PortofolioAdminComponent implements OnInit {
  porto: AngularFireList<any>;
  portoForm: FormGroup;
  isAdd = false;
  isEdit = false;
  portofolio: any[];
  portoData: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private appService: AppServiceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
