import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/User.model';
import { AccountService } from 'src/app/_services/account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  model: any = {};
  loggedIn: boolean = false;
  currentUser$: Observable<User | null>;

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {
    this.currentUser$ = this.accountService.currentUser$;
  }

  ngOnInit(): void {}

  login(): void {
    this.accountService.login(this.model).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/members');
      }
    });
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
