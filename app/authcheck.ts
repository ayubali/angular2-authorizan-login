import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {JwtHelper} from "angular2-jwt/angular2-jwt";

@Directive({
  selector: 'router-outlet'
})

export class AuthCheck extends RouterOutlet {
  publicRoutes:any;
  private parentRouter:Router;
  jwtHelper:JwtHelper = new JwtHelper();


  constructor(_elementRef:ElementRef, _loader:DynamicComponentLoader, _parentRouter:Router,
              @Attribute('name')nameAttr:string) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    this.publicRoutes = {
      'login': true
    };
  }

  activate(instruction:ComponentInstruction) {
    let url = instruction.urlPath;

    if (!this.publicRoutes[url] && !window.localStorage.getItem('auth_key')) {
      this.parentRouter.navigateByUrl('/login');
    }

    /*if(this.jwtHelper.isTokenExpired(window.localStorage.getItem('auth_key'))) {
       this.parentRouter.navigateByUrl('/login');
    }*/

    return super.activate(instruction);
  }
}
