import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService:AuthService,
    private router:Router) { }

  intercept(req, next){
    let tokenizedReq= req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.authService.getLocalToken()} `
      }
    });
    return next.handle(tokenizedReq).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401){
            this.handleAuthError();
            return of(err);
          }
          throw err;
        }
      )
    );;
  }
  private handleAuthError() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

  
}
