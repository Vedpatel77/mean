import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  Data : any
  id : any
  // user: any;
  constructor(private Router : Router,private http:HttpClient){}

  viewUser(){
    this.Data = sessionStorage.getItem('user');
    this.id = JSON.parse(this.Data)
    console.log(this.id);
    
    this.Router.navigate(['/users/' + this.id._id]);  
  }
}
