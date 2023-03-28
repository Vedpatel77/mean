import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginform = new FormGroup({
  email:new FormControl(''),
  password:new FormControl('')
})
loginuser(){
  console.log(this.loginform.value);
  
}
}
