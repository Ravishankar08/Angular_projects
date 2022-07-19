import { Component, OnInit } from '@angular/core';
import {  ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from "@angular/cdk/layout";
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {
  dashboard !:FormGroup;

  name="";

  id!:number;

  showAdd !:boolean

  empdata !: any;

  @ViewChild(MatSidenav) sidenav !:MatSidenav;

  constructor(private observer:BreakpointObserver,private http :HttpClient,private formbuilder :FormBuilder,private ser :AuthService){}

  onEdit(row:any){
    this.id=row.id;
    this.dashboard.controls['name'].setValue(row.name);
    this.dashboard.controls['email'].setValue(row.email);
    this.dashboard.controls['password'].setValue(row.password);
    this.showAdd=false
  }
  updateEmployee(){
    this.ser.update(this.id,this.dashboard.value)
    .subscribe(res=>{
      alert("updated Success");
      this.getemp();
      this.dashboard.reset()
      let ref = document.getElementById('cancel')
      ref?.click()
    },err=>{
      alert("Unsuccessfull"+err)
    })
  }

  deleteEmp(row:any){
    this.ser.delete(row.id)
    .subscribe(res=>{
      alert("empolyee Deleted");
      this.getemp()
    })
  }

   getemp(){
    this.ser.getdetails()
    .subscribe(res=>{
      this.empdata=res
    })
  }

  clickAddEmployee(){
    this.dashboard.reset();
    this.showAdd=true;
  }

  addbtn(){
    this.ser.addemployee(this.dashboard.value).subscribe((res)=>{
      alert("Added Successfully")
      this.getemp();
      this.dashboard.reset()
      let ref = document.getElementById('cancel')
      ref?.click()
    },err=>{
      alert("User not added")
    })
  }

  ngOnInit():void{
    this.dashboard=this.formbuilder.group({
      name : [''],
      email : [''],
      password : ['']
    })
    this.getemp();
  }

  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode='over'
        this.sidenav.close();
      }
      else{
        this.sidenav.mode='side';
        this.sidenav.open();
      }
    });
  }
}
