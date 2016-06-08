import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {JwtHelper, AuthHttp} from "angular2-jwt/angular2-jwt";


@Injectable()
export class AuthService {
  isLoggedin:boolean;
  jwtHelper:JwtHelper = new JwtHelper();


  constructor(private _http:Http, private authHttp:AuthHttp) {

  }




  loginfn(usercreds) {
    this.isLoggedin = false;
    var headers = new Headers();
    //var creds = 'name=' + usercreds.username + '&password=' + usercreds.password;
    var creds = {
      user: {
        email: usercreds.username,
        password: usercreds.password
      }
    }

    headers.append('Content-Type', 'application/json');
    /* headers.append('Access-Control-Allow-Origin', '*');
     headers.append('Access-Control-Allow-Headers', 'Content-Type');
     headers.append('Access-Control-Allow-Methods', 'POST');*/

    return new Promise((resolve) => {

      this._http.post('http://localhost:9000/km/api/v1/3b6bd8522c4627a0/login', JSON.stringify(creds), {headers: headers}).subscribe((data) => {
          window.localStorage.setItem('auth_key', data.json().session.api_token);
          this.isLoggedin = true;
          resolve(this.isLoggedin)
         console.log(" expiration: "+ this.jwtHelper.getTokenExpirationDate(data.json().session.api_token))
          console.log("data: " + JSON.stringify(data))
        },
        (err) => {
          console.log(err)
        },
        () => {
          console.log("authentication complete")
        }
      )

    })
  }

   testJsonDataUingAUthenHttp(){
     var myHeader = new Headers();
     myHeader.append('Content-Type', 'application/json');
     myHeader.append('Range', 'page:0;size:20;order:desc');
     return this.authHttp.get('http://localhost:9000/km/api/v1/3b6bd8522c4627a0/companies', {headers: myHeader})
       .subscribe(
         data => console.log(""),
         err => console.log(err),
         () => console.log('Request Complete')
       );
   }

}


/*

 headers.append('Content-Type', 'application/json');
 headers.append('Access-Control-Allow-Headers', 'Content-Type');
 headers.append('Access-Control-Allow-Methods', 'POST');
 headers.append('Access-Control-Allow-Origin', '*');

 return new Promise((resolve) => {

 console.log("cred: " + JSON.stringify(creds))
 this._http.post('http://localhost:9000/km/api/v1/3b6bd8522c4627a0/login', JSON.stringify(creds), {headers: headers}).subscribe((data) => {
 if (data.json().success) {
 //      window.localStorage.setItem('auth_key', data.json().session);
 console.log("Data: "+data.text())
 this.isLoggedin = true;
 }
 resolve(this.isLoggedin)
 }
 )

 })*/
