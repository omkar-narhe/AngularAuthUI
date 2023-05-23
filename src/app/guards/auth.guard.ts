import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private auth: AuthService, private route: Router, private toast: NgToastService){}

  canActivate(): boolean {
    if(this.auth.isLoggedIn()){
      return true;
    }
    this.toast.error({detail: "ERROR", summary:"Please login first!"});
    this.route.navigate(['/login']);
    return false;
  }
  
}
