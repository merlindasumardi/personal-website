import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: any = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  signIn(email, password) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.userDetails = user;
        console.log(this.userDetails);
      })
      .catch(err => console.log(err));
  }

  isLoggedIn() {
    if(this.userDetails == null) {
      return false;
    }
    else {
      return true;
    }
  }

  signOut() {
    this._firebaseAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
