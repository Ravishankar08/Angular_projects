import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !:FormGroup;
  constructor( private formbuilder:FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.signupForm=this.formbuilder.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4)]]
    });

  }
  signup(){
    this.http.post<any>("https://616852feba841a001727c6e6.mockapi.io/employee",this.signupForm.value)
    .subscribe((res)=>{
      alert("Signup Successfully");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err=>{
      alert("Something went wrong");
    })

  }


}
