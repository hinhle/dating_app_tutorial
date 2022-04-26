import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/User.model';
import { AccountService } from 'src/app/_services/account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  model: any = {}
  loggedIn: boolean = false;
  currentUser$ : Observable<User | null>;

  constructor(private accountService: AccountService) { 
    this.currentUser$ = this.accountService.currentUser$;
  }

  ngOnInit(): void {
  }

  login(): void {
    this.accountService.login(this.model).subscribe({
      next: res => {},
      error: err => {}
    });
  }

  logout(): void {
    this.accountService.logout();
  }

}
