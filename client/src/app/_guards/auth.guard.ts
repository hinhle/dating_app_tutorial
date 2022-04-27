import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, mergeMap, Observable, of } from 'rxjs';
import { AccountService } from '../_services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastrService: ToastrService) {}
  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      mergeMap(user => {
        if (user) return of(true);
        this.toastrService.error('You shall not pass');
        return of(false);
      })
    );
  }
  
}
