import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { LoginService } from '../../core/services/data/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      password: ''
    });
  }

  submit(): void {
    this.loginService.login(this.form.getRawValue()).subscribe(() => {
      this.router.navigate(['/'])
      this.loginService.confirmLogin();
    })
  }
}
