import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NodeService } from 'src/app/service/node.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public http: HttpClient,private route :Router){}
  data:any=[];
  loginform = new FormGroup({
  email:new FormControl(''),
  password:new FormControl('')
})


  postlogindata(Data:any){
    this.http.post('http://localhost:3000/login',Data).subscribe((res)=>{
      console.log(res);
      this.data = [res]
    })
    if (this.data.length==1) {
      alert("login successful!");
      this.route.navigate(['/home']);
      // sessionStorage
    } else {
      alert("invalid login credential!");
      this.route.navigate(['/login']);
    }
   }
}
