import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: Http, private db: AngularFireDatabase) { }

  addBanner(data) {
    return this.http.post('https://merlinda-website-1507826956343.firebaseio.com/banner.json', data);
  }

  addAboutMe(data) {
    return this.http.post('https://merlinda-website-1507826956343.firebaseio.com/aboutMe.json', data);
  }

  getAboutMe() {
    return this.http.get('https://merlinda-website-1507826956343.firebaseio.com/aboutMe.json');
  }

  addEducation(data) {
    return this.http.post('https://merlinda-website-1507826956343.firebaseio.com/education.json', data);
  }

  addWork(data) {
    return this.http.post('https://merlinda-website-1507826956343.firebaseio.com/work.json', data);
  }

  addAward(data) {
    return this.http.post('https://merlinda-website-1507826956343.firebaseio.com/awards.json', data);
  }

  addSkill(data) {
    return this.http.post('https://merlinda-website-1507826956343.firebaseio.com/skill.json', data);
  }

  addPortofolio(data) {
    return this.http.post('https://merlinda-website-1507826956343.firebaseio.com/portofolio.json', data);
  }

}
