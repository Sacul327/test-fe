import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(){
    return  this.http.post<any>('http://interview.agileengine.com/auth',  { "apiKey": "23567b218376f79d9415" }).subscribe(data => {
      localStorage.setItem('token',data.token)
  })
  }

  hasToken(){
    return !!localStorage.getItem('token')
  }

  getLocalToken(){
    return localStorage.getItem('token')
  }

  /*getImages(): Observable<any>{
    this.http.get('http://interview.agileengine.com/images').subscribe((data:any)=>{
      return data.pictures
    },error=>{
      console.log(error);
      return error
    })
  }*/

  getImages(page:number): Observable<any[]> {
    //return this.http.get<Hero[]>(this.heroesUrl);
    return this.http.get<any>(`http://interview.agileengine.com/images?page=${page}`)
  }

  getImageWID(id:number): Observable<any[]> {
    return this.http.get<any>(`http://interview.agileengine.com/images/${id}`)
  }

}
