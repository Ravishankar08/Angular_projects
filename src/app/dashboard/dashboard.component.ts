import { Component, OnInit } from '@angular/core';
import {  ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from "@angular/cdk/layout";
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {

  name="";

  @ViewChild(MatSidenav) sidenav !:MatSidenav;

  constructor(private observer:BreakpointObserver,private http :HttpClient){


  }
  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode='over';
        this.sidenav.close();
      }
      else{
        this.sidenav.mode='side';
        this.sidenav.open();
      }
    });
  }
}
