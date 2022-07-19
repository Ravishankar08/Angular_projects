import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient) { }

  addemployee( data :any){
    return this.http.post<any>('https://616852feba841a001727c6e6.mockapi.io/employee',data);
  }
  getdetails(){
    return this.http.get<any>('https://616852feba841a001727c6e6.mockapi.io/employee');
  }
  delete(id : number){
    return this.http.delete<any>('https://616852feba841a001727c6e6.mockapi.io/employee/'+id);
  }
  update(id:number,data:any){
    return this.http.put<any>('https://616852feba841a001727c6e6.mockapi.io/employee/'+id,data);
  }

}
