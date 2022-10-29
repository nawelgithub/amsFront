import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  /* authenticate(username, password) {
     if (username === "nawel" && password === "123") {//hardcoded
       sessionStorage.setItem('username', username)
       return true;
     } else {
       return false;
     }
   }*/

  authenticate(username, password) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + window.btoa(username + ':' + password) });
    return this.httpClient.get('http://localhost:8080/basicauth', { headers }).pipe
      (
        map(
          userData => {
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);
            console.log(username + " " + password);
            let authString = 'Basic ' + window.btoa(username + ':' + password);
            sessionStorage.setItem('basicauth', authString);

            return userData;
          }
        )
      );
  }



  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)//true or false
  }

  logout() {
    sessionStorage.removeItem('username')
  }

}
