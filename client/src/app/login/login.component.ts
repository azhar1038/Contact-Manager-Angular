import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    const values = form.value;

    const payload = {
      username: values.username,
      password: values.password
    };

    this.api.post('authenticate', payload)
      .subscribe(data=>{
        this.auth.setToken(data.token);
        this.router.navigate(['/contacts']);
      });
  }

}
