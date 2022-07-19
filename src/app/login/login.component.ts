import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !:FormGroup;

  name:any;
   c=0;
  constructor(private formbuilder:FormBuilder ,private http:HttpClient,private router :Router) { }

  ngOnInit(): void {
    this.loginForm=this.formbuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  public login(){
    this.http.get<any>('https://616852feba841a001727c6e6.mockapi.io/employee')
    .subscribe((res)=>{
      const user=res.find((a:any)=>{
        if(a.email===this.loginForm.value.email && a.password === this.loginForm.value.password){
          this.name=a.name;
          this.c=1;
          console.log(this.name)
        }
        return a.email===this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Successfully");
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
      }
      else{
        alert("check email and password");
        this.loginForm.reset();
        if(this.c=0){
          console.log("wrong user");
        }
      }
    },err=>{
      alert("Something went wrong")
    }
    )
  }

}
