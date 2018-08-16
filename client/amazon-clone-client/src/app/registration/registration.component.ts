import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  email = '';
  name = '';
  password = '';
  passwordConfirmation = '';
  isSeller = false;
  bthDisabled = false;

  constructor(private router: Router, private data: DataService, private rest: RestApiService) { }

  ngOnInit() {
  }

  validate() {
    if ((!this.name) || (!this.email) || (!this.password) || (!this.passwordConfirmation)) {
      this.data.error('Name and Email and Password and Confirmation Password could not be blank!');
    }
    if (this.email && this.name && this.password && this.passwordConfirmation && (this.passwordConfirmation === this.password)) {
      return true;
    }
    return false;
  }

  async register() {
    this.bthDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post('http://localhost:8080/api/accounts', {
          email: this.email,
          name: this.name,
          password: this.password,
          isSeller: this.isSeller
        });

        if (data['success']) {
          localStorage.setItem('token', data['token']);
          this.data.success('Registration successfully!');
        } else {
          this.data.error(data['message']);
        }
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.bthDisabled = false;
  }
}
