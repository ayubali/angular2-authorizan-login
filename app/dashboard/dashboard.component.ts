import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Headers} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../services/authservice";

@Component({
  templateUrl: '../app/dashboard/dashboard.html',
  providers: [AuthService]
})

export class DashboardComponent {


  constructor(private _router:Router, private _service:AuthService) {

  }

  logout() {
    window.localStorage.removeItem('auth_key');
    this._router.navigate(['Login']);
  }

  sendAuthenReq() {
   this._service.testJsonDataUingAUthenHttp();
  }
}
