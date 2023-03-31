import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css']
})
export class BloglistComponent implements OnInit{
blogdata:any;
//   constructor(private router: Router) {
//     this.blogdata =this.router.getCurrentNavigation()?.extras.state // should log out 'bar'
//   }
ngOnInit(): void {
  this.getblogs();
}
constructor(private http:HttpClient){}

getblogs(){
  this.http.get('http://localhost:3000/blogdata').subscribe((res)=>{
    console.log(res);
  this.blogdata=res;
  
  })
}
editblog(blog:any){

}
deleteblog(blog:any){

}
}
