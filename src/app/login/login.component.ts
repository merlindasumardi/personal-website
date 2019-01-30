import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error: {name: string, message: string} = {name: '', message: ''};

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    this.authService.signIn(this.email, this.password)
      .then(() => this.router.navigate(['/admin']))
      .catch(err => {
        this.error = err;
        this.router.navigate(['/']);
      });
  }

}
