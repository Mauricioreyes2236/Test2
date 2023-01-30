import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(user: any): Observable<any> {
    return this._http.post("https://reqres.in/api/login", user);
  }

  verificaAutentificacion(): Observable<boolean> {

    if( !localStorage.getItem('accessToken') ) {
      return of(false);
    }
      return of(true);
    
  }

}
